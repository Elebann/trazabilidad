import {
    Home, UserCog, Package, FileSpreadsheet, Briefcase, ChevronUp, LogOut, User, ClockFading,
    PackagePlus, PackageOpen, FileBox
} from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import {Link} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

const menuGroups = [
    {
        label: "EsterilMed",
        items: [
            {title: "Inicio", url: "/index", icon: Home},
            {title: "Clientes", url: "/clientes", icon: Briefcase},
            {title: "Material", url: "/material", icon: Package},
            {title: "Folios", url: "/folios", icon: FileSpreadsheet},
        ],
    },
    {
        label: "Enfermera",
        items: [
            {title: "Gestión de Usuarios", url: "/gestion-de-usuarios", icon: UserCog},
            {title: "Gestión de tiempo", url: "/gestion-de-tiempo", icon: ClockFading},
        ],
    },
    {
        label: "Instrumentista",
        items: [
            {title: "Ingreso de material", url: "/ingreso-material", icon: PackagePlus},
            {title: "Preparación de material", url: "/preparacion-material", icon: PackageOpen},
            //! TODO: these routes below should be hidden to non-permission users when roles has been implemented
            // Only Coordinador
            {title: "Modificación de Material", url: "/modificacion-material", icon: FileBox},
            // Only Operador
            {title: "Ingreso de carga", url: "/ingreso-carga", icon: FileBox},
        ],
    },
];

// todo: permitir que ciertos enlaces puedan expandirse para mostrar subenlaces, no es indispensable pero otorgaría mayor comodidad al usuario final.
export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                {menuGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                {item.icon && <item.icon/>}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* User footer. this is where users log out*/}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <span>Usuario</span>
                                    <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <User/>
                                    <span>Ver Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LogOut/>
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}