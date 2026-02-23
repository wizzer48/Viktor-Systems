"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, ShoppingCart } from "lucide-react"

import { Product } from "@/lib/scraper/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuote } from "@/context/QuoteContext"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem, items } = useQuote()
    const isAdded = items.some(item => item.id === product.id)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="group h-full flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <Link href={`/urunler/${product.id}`} className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={product.imagePath || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                            {product.brand}
                        </Badge>
                    </div>
                </Link>
                <CardHeader className="p-4 flex-none">
                    <p className="text-xs text-cyan-500 font-mono mb-1">{product.category}</p>
                    <CardTitle className="text-base line-clamp-2 leading-tight group-hover:text-cyan-500 transition-colors">
                        {product.name}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="p-4 mt-auto pt-0 flex gap-2">
                    <Button 
                        variant={isAdded ? "secondary" : "default"}
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                            e.preventDefault()
                            addItem(product)
                        }}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {isAdded ? "Eklendi" : "Teklife Ekle"}
                    </Button>
                    <Link href={`/urunler/${product.id}`}>
                        <Button variant="outline" size="sm" className="px-2">
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
