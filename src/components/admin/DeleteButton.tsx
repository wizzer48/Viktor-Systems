"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteButtonProps {
    onDelete: () => Promise<void>
    label?: string
}

export function DeleteButton({ onDelete, label = "Sil" }: DeleteButtonProps) {
    const [isConfirming, setIsConfirming] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleDelete = async () => {
        if (!isConfirming) {
            setIsConfirming(true)
            setTimeout(() => setIsConfirming(false), 3000)
            return
        }

        setIsLoading(true)
        try {
            await onDelete()
        } finally {
            setIsLoading(false)
            setIsConfirming(false)
        }
    }

    return (
        <Button
            variant={isConfirming ? "destructive" : "outline"}
            size="sm"
            onClick={handleDelete}
            disabled={isLoading}
            className="transition-all"
        >
            <Trash2 className="h-4 w-4 mr-2" />
            {isLoading ? "Siliniyor..." : isConfirming ? "Eminim, Sil" : label}
        </Button>
    )
}
