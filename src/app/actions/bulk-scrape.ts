'use server';

import { ScraperEngine } from '@/lib/scraper';
import { Brand } from '@/lib/scraper/types';

export async function scrapeSingleProduct(url: string, brand: Brand, categoryOverride?: string, subCategoryOverride?: string) {
    console.log(`🚀 Bulk Scrape Action: ${url} [Brand: ${brand}]`);

    try {
        const result = await ScraperEngine.scrape(
            url,
            brand,
            undefined, // headers
            undefined, // cookies
            categoryOverride,
            subCategoryOverride
        );

        return {
            success: result.success,
            message: result.message,
            product: result.data
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
