import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar.jsx"
import {Outlet} from "react-router-dom";
import React, {Fragment} from "react";
import {CustomTrigger} from "@/components/CustomTrigger.jsx";
import {SiteHeader} from "@/components/site-header.jsx";

export default function SidebarLayout() {
    const [open, setOpen] = React.useState(true)

    return (
        <SidebarProvider open={open} onOpenChange={setOpen}>
            <AppSidebar/> {/* The sidebar component that contains the menu items */}
            {/*<div className="bg-esteril-blue w-screen h-screen flex flex-col p-2"> */}
            <div className="w-screen h-screen">
                <SiteHeader/>

                {/* This is the main content area where the child routes will be rendered */}
                <Outlet/>
            </div>
            {/* </div> */}
        </SidebarProvider>
    )
}
