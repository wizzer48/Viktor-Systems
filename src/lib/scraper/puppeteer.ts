import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';

// @ts-ignore
puppeteer.use(StealthPlugin());

export async function getBrowser(): Promise<Browser> {
    return await puppeteer.launch({
        headless: true, // Set to false if you want to see the browser
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined, // Useful for Docker
    });
}

export async function createPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();

    // Standard desktop headers to look more human
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
    });

    // Set a realistic viewport
    await page.setViewport({ width: 1920, height: 1080 });

    return page;
}
