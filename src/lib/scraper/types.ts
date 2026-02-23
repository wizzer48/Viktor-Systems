export type Brand = 'Interra' | 'EAE' | 'General';

export interface Product {
    id: string; // Slugified title + hash
    brand: Brand;
    name: string;
    category: string; // Our internal category
    subCategory?: string; // Optional sub-category
    originalCategory: string; // Original manufacturer category
    description: string;
    imagePath: string | null;
    images: string[];
    datasheetPath: string | null;
    sourceUrl: string;
    specs: Record<string, string>;
    lastUpdated: string;
}

export interface RawProductData {
    title: string;
    description: string;
    originalCategory: string;
    rawImageUrl?: string;
    rawImages?: string[];
    rawPdfUrl?: string;
    sourceUrl: string;
    specs: Record<string, string>;
}

export interface ScraperOptions {
    url: string;
    brand: Brand;
    headers?: Record<string, string>;
    cookies?: any[];
}

export interface ScrapeResult {
    success: boolean;
    message: string;
    data: Product | null;
}
