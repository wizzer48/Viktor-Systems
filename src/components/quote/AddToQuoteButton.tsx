"use client"

import * as React from "react"
import { ShoppingCart, Check } from "lucide-react"

import { Product } from "@/lib/scraper/types"
import { Button } from "@/components/ui/button"
import { useQuote } from "@/context/QuoteContext"
import { cn } from "@/lib/utils"

interface AddToQuoteButtonProps {
    product: Product
    className?: string
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
    size?: "default" | "sm" | "lg" | "icon"
}

export function AddToQuoteButton({ 
    product, 
    className,
    variant = "default",
    size = "default"
}: AddToQuoteButtonProps) {
    const { addItem, items } = useQuote()
    const isAdded = items.some(item => item.id === product.id)

    return (
        <Button
            onClick={() => addItem(product)}
            variant={isAdded ? "secondary" : variant}
            size={size}
            className={cn("w-full transition-all", className)}
        >
            {isAdded ? (
                <>
                    <Check className="h-4 w-4 mr-2" />
                    Teklif Listesinde
                </>
            ) : (
                <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Teklife Ekle
                </>
            )}
        </Button>
    )
}
