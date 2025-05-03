import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar.jsx"
import {Outlet} from "react-router-dom";
import React from "react";
import {CustomTrigger} from "@/components/CustomTrigger.jsx";

export default function SidebarLayout(){
    const [open, setOpen] = React.useState(true)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar /> {/* The sidebar component that contains the menu items */}
      <main className="p-2">
          {/* The trigger button to collapse and expand the sidebar */}
          <CustomTrigger />
          {/* This is the main content area where the child routes will be rendered */}
          <Outlet />
      </main>
    </SidebarProvider>
  )
}
