import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-background py-12">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tighter text-primary">VIKTOR</h3>
                    <p className="text-sm text-muted-foreground">
                        Akıllı bina otomasyon çözümlerinde teknoloji ve konforu birleştiriyoruz.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/kurumsal" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
                        <li><Link href="/urunler" className="hover:text-primary transition-colors">Ürünler</Link></li>
                        <li><Link href="/cozumler" className="hover:text-primary transition-colors">Çözümlerimiz</Link></li>
                        <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Markalarımız</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Interra</li>
                        <li>EAE Technology</li>
                        <li>Legrand</li>
                        <li>Schneider Electric</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">İletişim</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>info@viktor.com.tr</li>
                        <li>+90 (212) 555 55 55</li>
                        <li>İstanbul, Türkiye</li>
                    </ul>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} VIKTOR Bina Teknolojileri. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    )
}
