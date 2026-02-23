import categoryMap from '../../data/category-map.json';

export class CategoryMapper {
    /**
     * Maps a raw category string from the manufacturer to our normalized internal categories.
     * @param rawCategory The category string found on the manufacturer page.
     */
    static map(rawCategory: string): string {
        if (!rawCategory) return 'Diğer';

        const normalized = rawCategory.toLowerCase().trim();

        // 1. Direct match in mapping file
        for (const [internalCategory, synonyms] of Object.entries(categoryMap)) {
            if (Array.isArray(synonyms)) {
                if (synonyms.some(s => normalized.includes(s.toLowerCase()))) {
                    return internalCategory;
                }
            }
        }

        // 2. Keyword based extraction
        if (normalized.includes('touch') || normalized.includes('panel') || normalized.includes('ekran')) return 'Dokunmatik Paneller';
        if (normalized.includes('actuator') || normalized.includes('aktuator')) return 'Aktüatörler';
        if (normalized.includes('sensor') || normalized.includes('detector')) return 'Sensörler';
        if (normalized.includes('gateway') || normalized.includes('interface')) return 'Gateway & Arayüzler';
        if (normalized.includes('power') || normalized.includes('supply')) return 'Güç Kaynakları';

        return 'Genel';
    }
}
