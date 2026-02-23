"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { projectSchema } from "@/lib/schemas"
import { saveProject } from "@/app/actions/project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectFormProps {
    initialData?: any
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            location: "",
            year: new Date().getFullYear().toString(),
            imagePath: "",
            category: "Konut"
        }
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const result = await saveProject(data)
            if (result.success) {
                router.push("/admin/projeler")
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
                            <label className="text-sm font-medium">Proje Adı</label>
                            <Input {...register("title")} placeholder="Örn: Ritz Carlton Residences" />
                            {errors.title && <p className="text-xs text-red-500">{errors.title.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kategori</label>
                            <Input {...register("category")} placeholder="Örn: Konut, Ofis, Otel" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Lokasyon</label>
                            <Input {...register("location")} placeholder="Örn: İstanbul / Beşiktaş" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Yıl</label>
                            <Input {...register("year")} placeholder="Örn: 2023" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Açıklama</label>
                        <Textarea {...register("description")} rows={5} placeholder="Proje detayları ve yapılan işler..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Görsel URL / Path</label>
                        <Input {...register("imagePath")} placeholder="/uploads/projects/main.jpg" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    İptal
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Kaydediliyor..." : "Projeyi Kaydet"}
                </Button>
            </div>
        </form>
    )
}
