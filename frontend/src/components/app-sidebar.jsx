import {Home, Users, Box, FileSpreadsheet, Briefcase, ChevronUp, LogOut, User, ClockFading} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"

import {Link} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

// Menu items.

// todo: en /folios, crear 2 subvistas que permitan: una visualizar y una para editar los elementos, algo como el estado y la vista en la que está el folio completo
const items = [
  {
    title: "Inicio",
    url: "/index",
    icon: Home,
  },
  {
    /* todo: el crud para los usuarios */
    title: "Usuarios",
    url: "/gestion-de-usuarios",
    icon: Users,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Briefcase,
  },
  {
    title: "Material",
    url: "/material",
    icon: Box,
  },
  {
    title: "Folios",
    url: "/folios",
    icon: FileSpreadsheet,
  },
  {
    title: "Gestión de tiempo",
    url: "/gestion-de-tiempo",
    icon: ClockFading,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/*<img src={Logo} alt="Logo de EsterilMed" className="mx-auto h-10 w-auto"/> */}
          <SidebarGroupLabel>EsterilMed</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* Use Link from react-router-dom to navigate */}
                    <Link to={item.url}>
                      { item.url ? <item.icon/> : null}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <span>Usuario</span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <User />
                    <span>Ver Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

    </Sidebar>
  )
}
