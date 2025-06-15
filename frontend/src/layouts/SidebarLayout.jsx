import {useState} from "react";
import {Outlet} from "react-router-dom";
import {AppSidebar} from "@/components/app-sidebar.jsx"
import {SiteHeader} from "@/components/site-header.jsx";
import {SidebarProvider} from "@/components/ui/sidebar"

export default function SidebarLayout() {
    const [open, setOpen] = useState(true)

    return (
        <SidebarProvider open={open} onOpenChange={setOpen}>
            <div className="flex h-screen w-screen">
                <AppSidebar /> {/* Sidebar ocupa su ancho fijo */}
                <div className="flex flex-col flex-1 min-w-0">
                    <SiteHeader />
                    {/* El contenido principal ocupa el resto y puede scrollearse */}
                    <div className="flex-1 min-h-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}
