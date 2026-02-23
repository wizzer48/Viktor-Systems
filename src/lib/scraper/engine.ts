import { Brand, Product, ScrapeResult } from './types';
import { InterraAdapter } from './adapters/interra';
import { EAEAdapter } from './adapters/eae';
import { GenericFallbackAdapter } from './adapters/generic';
import { CategoryMapper } from './mapper';
import { AssetDownloader } from './downloader';
import path from 'path';
import fs from 'fs';
import slugify from 'slugify';
import crypto from 'crypto';

const DB_PATH = path.join(process.cwd(), 'src/data/products.json');
const UPLOAD_ROOT = path.join(process.cwd(), 'public/uploads');

export class ScraperEngine {
    static async scrape(
        url: string,
        brand: Brand,
        headers?: Record<string, string>,
        cookies?: any[],
        categoryOverride?: string,
        subCategoryOverride?: string
    ): Promise<ScrapeResult> {
        const result: ScrapeResult = { success: false, message: '', data: null };

        try {
            // 1. Select Adapter
            let adapter;
            const options = { url, brand, headers, cookies };

            if (brand === 'Interra' || url.includes('interratechnology.com')) {
                adapter = new InterraAdapter(options);
            } else if (brand === 'EAE' || url.includes('eaetechnology.com')) {
                adapter = new EAEAdapter(options);
            } else {
                adapter = new GenericFallbackAdapter(options);
            }

            // 2. Fetch & Scrape Raw
            console.log(`🔍 Starting Scrape for: ${url} [Brand: ${brand}]`);
            await adapter.fetch();
            const rawData = await adapter.scrapeRaw();

            if (!rawData.title || rawData.title === 'No Title') {
                throw new Error('Ürün başlığı bulunamadı. Sayfa yüklenememiş olabilir.');
            }

            // 3. Category Mapping
            const normalizedCategory = categoryOverride || CategoryMapper.map(rawData.originalCategory || 'General');

            // 4. Asset Download (Images & PDFs)
            const productDir = path.join(UPLOAD_ROOT, 'products');
            const docDir = path.join(UPLOAD_ROOT, 'docs');

            // Main Image
            const imagePath = await AssetDownloader.downloadImage(rawData.rawImageUrl || '', productDir);

            // Gallery
            const galleryPaths: string[] = [];
            if (rawData.rawImages && rawData.rawImages.length > 0) {
                for (const imgUrl of rawData.rawImages) {
                    const localImg = await AssetDownloader.downloadImage(imgUrl, productDir);
                    if (localImg) galleryPaths.push(localImg);
                }
            }

            // PDF Datasheet
            const datasheetPath = await AssetDownloader.downloadPdf(rawData.rawPdfUrl || '', docDir);

            // 5. Construct Final Product
            const slug = slugify(rawData.title);
            const hashSuffix = crypto.createHash('md5').update(url).digest('hex').substring(0, 4);
            const productId = `${slug}-${hashSuffix}`;

            // Clean description: Remove <img> tags and ensure safe HTML
            const cleanedDescription = (rawData.description || '')
                .replace(/<img[^>]*>/gi, '') // Remove all <img> tags
                .replace(/<a[^>]*>\s*<\/a>/gi, '') // Remove empty anchors
                .trim();

            const product: Product = {
                id: productId,
                brand,
                name: rawData.title,
                category: normalizedCategory,
                subCategory: subCategoryOverride,
                originalCategory: rawData.originalCategory,
                description: cleanedDescription,
                imagePath: imagePath || '/placeholder.jpg',
                images: galleryPaths,
                datasheetPath: datasheetPath,
                sourceUrl: url,
                specs: rawData.specs || {},
                lastUpdated: new Date().toISOString(),
            };

            await this.saveProduct(product);
            console.log(`💾 KAYDEDİLDİ: ${product.name}`);

            result.success = true;
            result.message = 'Başarıyla çekildi';
            result.data = product;

        } catch (error) {
            console.error('❌ SCRAPE HATASI:', error);
            result.message = error instanceof Error ? error.message : 'Bilinmeyen hata';
        }

        return result;
    }

    private static async saveProduct(product: Product) {
        let products: Product[] = [];

        if (fs.existsSync(DB_PATH)) {
            const content = fs.readFileSync(DB_PATH, 'utf-8');
            try {
                products = JSON.parse(content);
            } catch (e) {
                products = [];
            }
        }

        // Upsert by ID
        const index = products.findIndex(p => p.id === product.id);
        if (index > -1) {
            products[index] = product;
        } else {
            products.push(product);
        }

        fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
    }
}
