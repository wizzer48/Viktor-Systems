import { BaseAdapter } from './base';
import * as cheerio from 'cheerio';
import { getBrowser, createPage } from '../puppeteer';

export class InterraAdapter extends BaseAdapter {
    async fetch(): Promise<void> {
        // Interra uses Puppeteer for deep discovery
        console.log(`🚀 Using Puppeteer for Interra: ${this.options.url}`);
        const browser = await getBrowser();
        try {
            const page = await createPage(browser);
            
            // Set cookies if provided
            if (this.options.cookies) {
                await page.setCookie(...this.options.cookies);
            }

            // Go to page
            await page.goto(this.options.url, { waitUntil: 'networkidle2', timeout: 60000 });

            // Extract content directly from DOM to avoid hydration issues
            const data = await page.evaluate(() => {
                const title = document.querySelector('h1')?.textContent?.trim() || 'No Title';
                
                // Description extraction (complex due to tabs)
                const descSelectors = [
                    '#description', 
                    '.product-description', 
                    '.product-details-content',
                    '[role="tabpanel"][id*="description"]'
                ];
                
                let description = '';
                for (const sel of descSelectors) {
                    const el = document.querySelector(sel);
                    if (el) {
                        const clone = el.cloneNode(true) as HTMLElement;
                        // Remove unwanted elements
                        clone.querySelectorAll('style, script, hr, iframe, link, img').forEach(junk => junk.remove());
                        description = clone.innerHTML.trim();
                        break;
                    }
                }

                // Images
                const images = Array.from(document.querySelectorAll('.product-image-container img, .gallery-item img'))
                    .map(img => (img as HTMLImageElement).src)
                    .filter(src => src && !src.includes('data:image'));

                // PDF
                const pdf = (document.querySelector('a[href$=".pdf"]') as HTMLAnchorElement)?.href || '';

                // Category
                const category = document.querySelector('.breadcrumb li:nth-last-child(2)')?.textContent?.trim() || 'General';

                // Specs
                const specs: Record<string, string> = {};
                document.querySelectorAll('.specification-row, .product-specs tr').forEach(row => {
                    const key = row.querySelector('.spec-name, td:first-child')?.textContent?.trim();
                    const val = row.querySelector('.spec-value, td:last-child')?.textContent?.trim();
                    if (key && val) specs[key] = val;
                });

                return { title, description, images, pdf, category, specs };
            });

            // Store result in adapter properties for base methods to use
            // Though for Interra we override scrapeRaw to return this directly
            (this as any).puppeteerData = data;
            this.html = await page.content();
            this.$ = cheerio.load(this.html);

        } finally {
            await browser.close();
        }
    }

    protected extractTitle(): string {
        return (this as any).puppeteerData?.title || 'No Title';
    }

    protected extractDescription(): string {
        return (this as any).puppeteerData?.description || '';
    }

    protected extractImage(): string {
        return (this as any).puppeteerData?.images?.[0] || '';
    }

    protected extractPdf(): string {
        return (this as any).puppeteerData?.pdf || '';
    }

    protected extractOriginalCategory(): string {
        return (this as any).puppeteerData?.category || 'General';
    }

    protected extractSpecs(): Record<string, string> {
        return (this as any).puppeteerData?.specs || {};
    }

    async scrapeRaw(): Promise<any> {
        const data = (this as any).puppeteerData;
        return {
            title: data.title,
            description: data.description,
            originalCategory: data.category,
            rawImageUrl: data.images?.[0] || '',
            rawImages: data.images || [],
            rawPdfUrl: data.pdf,
            sourceUrl: this.options.url,
            specs: data.specs
        };
    }
}
