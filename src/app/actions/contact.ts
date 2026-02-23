'use server';

import { ContactSchema } from '@/lib/schemas';

export async function sendContactForm(formData: any) {
    try {
        const validated = ContactSchema.parse(formData);

        // Simulation of database save or email send
        console.log('Contact form received:', validated);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Mesajınız başarıyla iletildi. En kısa sürede size geri döneceğiz.'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tüm alanları doğru doldurduğunuzdan emin olun.'
        };
    }
}
