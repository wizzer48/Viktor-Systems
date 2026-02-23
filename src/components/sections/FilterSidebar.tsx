"use client"

import * as React from "react"
import { Search, Filter } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FilterSidebarProps {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    brands: string[]
    selectedBrand: string
    onBrandChange: (brand: string) => void
}

export function FilterSidebar({
    categories,
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    brands,
    selectedBrand,
    onBrandChange,
}: FilterSidebarProps) {
    return (
        <aside className="w-full md:w-64 space-y-8">
            <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Arama</h4>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Ürün ara..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Kategoriler</h4>
                <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
                    <Button
                        variant={selectedCategory === "" ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => onCategoryChange("")}
                    >
                        Tüm Ürünler
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => onCategoryChange(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Markalar</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant={selectedBrand === "" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => onBrandChange("")}
                    >
                        Tümü
                    </Badge>
                    {brands.map((brand) => (
                        <Badge
                            key={brand}
                            variant={selectedBrand === brand ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => onBrandChange(brand)}
                        >
                            {brand}
                        </Badge>
                    ))}
                </div>
            </div>
        </aside>
    )
}
