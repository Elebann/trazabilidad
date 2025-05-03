import {Home, Users, Box} from "lucide-react"
import Logo from "@/assets/Logo_EsterilMed.jpeg"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {Link} from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/index",
    icon: Home,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
  },
  {
    title: "Trazabilidad",
    url: "/trazabilidad",
    icon: Box,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <img src={Logo} alt="Logo de EsterilMed" className="mx-auto h-10 w-auto" />
          <SidebarGroupLabel>EsterilMed</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* Use Link from react-router-dom to navigate */}
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>

                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
