"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
    LayoutDashboard, 
    Package, 
    FolderKanban, 
    FileText, 
    Settings,
    Globe,
    LogOut
} from "lucide-react"

import { cn } from "@/lib/utils"
import { logout } from "@/app/actions/auth"

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Ürün Yönetimi", href: "/admin/urunler", icon: Package },
    { name: "Proje Yönetimi", href: "/admin/projeler", icon: FolderKanban },
    { name: "Teklif Talepleri", href: "/admin/teklifler", icon: FileText },
    { name: "Toplu İşlemler", href: "/admin/toplu", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r bg-slate-950 text-slate-200 flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold tracking-tighter text-cyan-400">VIKTOR ADMIN</h1>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                            pathname === item.href 
                                ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                                : "hover:bg-slate-900 text-slate-400 hover:text-slate-100"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
                >
                    <Globe className="h-5 w-5" />
                    Siteye Git
                </Link>
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    )
}
