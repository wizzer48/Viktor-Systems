"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1A202C]">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A202C] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                        Geleceğin Yapılarını <br />
                        <span className="text-cyan-400">Biz İnşa Ediyoruz</span>
                    </h1>
                    <p className="max-w-[700px] mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
                        Akıllı bina sistemleri, KNX otomasyon ve üst düzey konfor çözümleriyle 
                        yaşam alanlarınızı yeniden tanımlıyoruz.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link href="/urunler">
                        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 border-none px-8 font-semibold">
                            Ürünlerimizi İnceleyin
                        </Button>
                    </Link>
                    <Link href="/iletisim">
                        <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 px-8 font-semibold backdrop-blur-sm">
                            Bize Ulaşın
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
