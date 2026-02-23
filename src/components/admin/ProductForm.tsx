"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Product } from "@/lib/scraper/types"
import { productSchema } from "@/lib/schemas"
import { saveProduct } from "@/app/actions/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface ProductFormProps {
    initialData?: Product
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            brand: "Interra",
            imagePath: "",
            specs: []
        }
    })

    const onSubmit = async (data: Product) => {
        setIsLoading(true)
        try {
            const result = await saveProduct(data)
            if (result.success) {
                router.push("/admin/urunler")
                router.refresh()
            } else {
                alert(result.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ürün Adı</label>
                            <Input {...register("name")} placeholder="Örn: Interra 4 Touch Panel" />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Marka</label>
                            <Input {...register("brand")} placeholder="Örn: Interra" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kategori</label>
                            <Input {...register("category")} placeholder="Örn: Touch Panels" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Alt Kategori (Opsiyonel)</label>
                            <Input {...register("subCategory")} placeholder="Örn: KNX Touch Panels" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Açıklama</label>
                        <Textarea {...register("description")} rows={5} placeholder="Ürün detayları..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Görsel URL / Path</label>
                        <Input {...register("imagePath")} placeholder="/uploads/products/image.jpg" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    İptal
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Kaydediliyor..." : "Ürünü Kaydet"}
                </Button>
            </div>
        </form>
    )
}
