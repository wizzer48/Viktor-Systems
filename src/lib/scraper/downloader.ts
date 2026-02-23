import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';

export class AssetDownloader {
    static async downloadImage(url: string, targetDir: string): Promise<string | null> {
        try {
            if (!url) return null;

            // Ensure directory exists
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            // Generate unique filename based on URL hash
            const hash = crypto.createHash('md5').update(url).digest('hex');
            const ext = path.extname(new URL(url).pathname) || '.jpg';
            const filename = `${hash}${ext}`;
            const targetPath = path.join(targetDir, filename);

            // Relative path for database
            const publicPath = `/uploads/products/${filename}`;

            // Check if already exists
            if (fs.existsSync(targetPath)) return publicPath;

            console.log(`📥 Downloading Image: ${url}`);
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            const writer = fs.createWriteStream(targetPath);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(publicPath));
                writer.on('error', reject);
            });

        } catch (error) {
            console.error(`❌ Image download failed: ${url}`, error instanceof Error ? error.message : error);
            return null;
        }
    }

    static async downloadPdf(url: string, targetDir: string): Promise<string | null> {
        try {
            if (!url) return null;

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            const fileName = path.basename(new URL(url).pathname);
            const targetPath = path.join(targetDir, fileName);
            const publicPath = `/uploads/docs/${fileName}`;

            if (fs.existsSync(targetPath)) return publicPath;

            console.log(`📥 Downloading PDF: ${url}`);
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
                timeout: 20000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            const writer = fs.createWriteStream(targetPath);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(publicPath));
                writer.on('error', reject);
            });

        } catch (error) {
            console.error(`❌ PDF download failed: ${url}`, error instanceof Error ? error.message : error);
            return null;
        }
    }
}
