'use server';

import fs from 'fs';
import path from 'path';
import { Product } from '@/lib/scraper/types';
import { revalidatePath } from 'next/cache';

const DB_PATH = path.join(process.cwd(), 'src/data/products.json');

export async function getProducts() {
    if (!fs.existsSync(DB_PATH)) return [];
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        return JSON.parse(content) as Product[];
    } catch (e) {
        return [];
    }
}

export async function deleteProduct(id: string) {
    if (!fs.existsSync(DB_PATH)) return { success: false };
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    let products: Product[] = [];
    try {
        products = JSON.parse(content);
    } catch (e) {
        return { success: false };
    }

    const filtered = products.filter(p => p.id !== id);
    fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2));
    revalidatePath('/admin/urunler');
    revalidatePath('/urunler');
    return { success: true };
}
