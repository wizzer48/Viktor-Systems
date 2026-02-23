"use client"

import * as React from "react"
import { MessageCircle, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatActions() {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const openWhatsApp = () => {
        window.open("https://wa.me/905555555555", "_blank")
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {isVisible && (
                <Button
                    size="icon"
                    onClick={scrollToTop}
                    className="rounded-full shadow-lg h-12 w-12 bg-background border hover:bg-accent"
                >
                    <ArrowUp className="h-6 w-6" />
                </Button>
            )}
            <Button
                size="icon"
                onClick={openWhatsApp}
                className="rounded-full shadow-lg h-12 w-12 bg-green-500 hover:bg-green-600 text-white border-none"
            >
                <MessageCircle className="h-6 w-6" />
            </Button>
        </div>
    )
}
