'use server';

import { ScraperEngine } from '@/lib/scraper';
import { Brand } from '@/lib/scraper/types';

export async function scrapeProduct(formData: FormData) {
    const url = formData.get('url') as string;
    const brand = formData.get('brand') as Brand;
    const categoryOverride = formData.get('categoryOverride') as string;

    if (!url || !brand) {
        return { success: false, message: 'URL and Brand are required' };
    }

    try {
        const result = await ScraperEngine.scrape(url, brand, undefined, undefined, categoryOverride);
        return {
            success: result.success,
            message: result.message,
            product: result.data
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Scrape failed'
        };
    }
}
