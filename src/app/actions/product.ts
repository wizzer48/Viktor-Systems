'use server';

import fs from 'fs';
import path from 'path';
import { Product } from '@/lib/scraper/types';
import { revalidatePath } from 'next/cache';

const DB_PATH = path.join(process.cwd(), 'src/data/products.json');
const UPLOAD_ROOT = path.join(process.cwd(), 'public/uploads');

export async function saveProduct(formData: FormData) {
    const id = formData.get('id') as string || `custom-${Date.now()}`;
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as any;
    const category = formData.get('category') as string;
    const subCategory = formData.get('subCategory') as string;
    const description = formData.get('description') as string;
    const specsJson = formData.get('specs') as string;
    
    let specs = {};
    try {
        specs = JSON.parse(specsJson);
    } catch (e) {}

    let products: Product[] = [];
    if (fs.existsSync(DB_PATH)) {
        products = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }

    const existingIndex = products.findIndex(p => p.id === id);
    
    const product: Product = {
        id,
        name,
        brand,
        category,
        subCategory,
        description,
        specs,
        originalCategory: category,
        sourceUrl: '',
        lastUpdated: new Date().toISOString(),
        imagePath: formData.get('imagePath') as string || '/placeholder.jpg',
        images: [],
        datasheetPath: formData.get('datasheetPath') as string || null,
    };

    if (existingIndex > -1) {
        products[existingIndex] = { ...products[existingIndex], ...product };
    } else {
        products.push(product);
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
    revalidatePath('/admin/urunler');
    revalidatePath('/urunler');
    
    return { success: true, id };
}
