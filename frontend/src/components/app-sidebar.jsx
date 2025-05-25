import {
    Home, UserCog, Package, FileSpreadsheet, Briefcase, ChevronUp, LogOut, User, ClockFading,
    PackagePlus, PackageOpen, FileBox
} from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import {Link, useNavigate} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

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
            {title: "Gestión de Usuarios", url: "/usuarios", icon: UserCog},
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

    const [userName, setUserName] = useState('Usuario') // <- name by default
    const navigate = useNavigate();

    // display user name from localStorage
    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data')
        if (storedUserData) {
            try {
                const userData = JSON.parse(storedUserData);
                if (userData && userData.nombre) {
                    setUserName(userData.nombre)
                }
            } catch (error) {
                console.error("Error al parsear user_data de localStorage:", error)
            }
        }
    }, []);

    const handleLogout = async () => {
        // todo send the refresh token to the backend to invalidate it using an endpoint (not implemented yet)

        // clean localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');

        toast.success('Sesión cerrada correctamente.');
        navigate('/login');
    };

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
                                    <span className="truncate">{userName}</span>
                                    <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <User/>
                                    <span>Ver Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
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