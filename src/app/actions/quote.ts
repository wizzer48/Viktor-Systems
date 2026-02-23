'use server';

import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/quotes.json');

export async function submitQuote(data: any) {
    let quotes = [];
    if (fs.existsSync(DB_PATH)) {
        try {
            quotes = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        } catch (e) {}
    }

    const quote = {
        id: `quote-${Date.now()}`,
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
    };

    quotes.push(quote);
    fs.writeFileSync(DB_PATH, JSON.stringify(quotes, null, 2));

    return { success: true, id: quote.id };
}
