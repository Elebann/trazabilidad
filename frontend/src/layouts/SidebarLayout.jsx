import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar.jsx"
import {Outlet} from "react-router-dom";

export default function SidebarLayout(){
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
