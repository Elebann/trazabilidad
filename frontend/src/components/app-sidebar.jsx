import {
    Home, UserCog, FileSpreadsheet, Briefcase, LogOut, LogIn, User,
    PackagePlus, PackageOpen, FileBox, Box, ChevronRight, Bubbles, Boxes
} from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarSeparator
} from "@/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.jsx";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {Spacer} from "@/components/Spacer.jsx";

const menuGroups = [
    {
        label: "EsterilMed",
        items: [
            {title: "Inicio", url: "/index", icon: Home},
            {title: "Clientes", url: "/clientes", icon: Briefcase},
            // {title: "Materiales", url: "/material", icon: Package},
            {title: "Folio y Materiales", url: "/folios", icon: FileSpreadsheet},
        ],
    },
    {
        label: "Instrumentista",
        items: [
            {
                title: "Ingreso de Material", icon: PackagePlus,
                children: [
                    // {title: "Externo", url: "/ingreso-externo", icon: Box},
                    {title: "Pabellón", url: "/ingreso-pabellon", icon: Box},
                    {title: "Médico", url: "/ingreso-medico", icon: Box},
                    {title: "Dental", url: "/ingreso-dental", icon: Box},
                ],
            },
            {
                title: "Preparación de Material", icon: PackageOpen,
                children:[
                    // {title: "Externo", url: "/preparacion-material-externo", icon: PackageOpen},
                    {title: "Pabellón", url: "/preparacion-material-pabellon", icon: PackageOpen},
                    {title: "Médico", url: "/preparacion-material-medico", icon: PackageOpen},
                    {title: "Dental", url: "/preparacion-material-dental", icon: PackageOpen},
                ]
            }
        ],
    },
    {
        label: "Coordinador",
        items: [
            {
                title: "Ingreso de Material", icon: PackagePlus,
                children: [
                    // {title: "Externo", url: "/ingreso-externo", icon: Box},
                    {title: "Pabellón", url: "/ingreso-pabellon", icon: Box},
                    {title: "Médico", url: "/ingreso-medico", icon: Box},
                    {title: "Dental", url: "/ingreso-dental", icon: Box},
                ],
            },
            {
                title: "Preparación de Material", icon: PackageOpen,
                children:[
                    // {title: "Externo", url: "/preparacion-material-externo", icon: PackageOpen},
                    {title: "Pabellón", url: "/preparacion-material-pabellon", icon: PackageOpen},
                    {title: "Médico", url: "/preparacion-material-medico", icon: PackageOpen},
                    {title: "Dental", url: "/preparacion-material-dental", icon: PackageOpen},
                ]
            },
            // {type: "separator", id: "coordinador-sep-1"},
            {
                title: "Modificación de material", icon: FileBox,
                children: [
                    // {title: "Externo", url: "/modificacion-material-externo", icon: FileBox},
                    {title: "Pabellon", url: "/modificacion-material-pabellon", icon: FileBox},
                    {title: "Medico", url: "/modificacion-material-medico", icon: FileBox},
                    {title: "Dental", url: "/modificacion-material-dental", icon: FileBox},
                ],
            },
        ],
    },
    {
        label: "Operador",
        items: [
            {
                title: "Ingreso de Material", icon: PackagePlus,
                children: [
                    // {title: "Externo", url: "/ingreso-externo", icon: Box},
                    {title: "Pabellón", url: "/ingreso-pabellon", icon: Box},
                    {title: "Médico", url: "/ingreso-medico", icon: Box},
                    {title: "Dental", url: "/ingreso-dental", icon: Box},
                ],
            },
            {
                title: "Preparación de Material", icon: PackageOpen,
                children:[
                    // {title: "Externo", url: "/preparacion-material-externo", icon: PackageOpen},
                    {title: "Pabellón", url: "/preparacion-material-pabellon", icon: PackageOpen},
                    {title: "Médico", url: "/preparacion-material-medico", icon: PackageOpen},
                    {title: "Dental", url: "/preparacion-material-dental", icon: PackageOpen},
                ]
            },
            // {type: "separator", id: "operador-sep-1"},
            {
                title: "Modificación de material", icon: FileBox,
                children: [
                    // {title: "Externo", url: "/modificacion-material-externo", icon: FileBox},
                    {title: "Pabellon", url: "/modificacion-material-pabellon", icon: FileBox},
                    {title: "Medico", url: "/modificacion-material-medico", icon: FileBox},
                    {title: "Dental", url: "/modificacion-material-dental", icon: FileBox},
                ],
            },
            // {type: "separator", id: "operador-sep-2"},
            {title: "Carga de materiales", url: "/ingreso-carga", icon: Bubbles},
            {title: "Cargas activas", url: "/cargas", icon: Boxes},
        ],
    },
    {
        label: "Administrador",
        items: [
            {
                title: "Ingreso de Material", icon: PackagePlus,
                children: [
                    // {title: "Externo", url: "/ingreso-externo", icon: Box},
                    {title: "Pabellón", url: "/ingreso-pabellon", icon: Box},
                    {title: "Médico", url: "/ingreso-medico", icon: Box},
                    {title: "Dental", url: "/ingreso-dental", icon: Box},
                ],
            },
            {
                title: "Preparación de Material", icon: PackageOpen,
                children:[
                    // {title: "Externo", url: "/preparacion-material-externo", icon: PackageOpen},
                    {title: "Pabellón", url: "/preparacion-material-pabellon", icon: PackageOpen},
                    {title: "Médico", url: "/preparacion-material-medico", icon: PackageOpen},
                    {title: "Dental", url: "/preparacion-material-dental", icon: PackageOpen},
                ]
            },
            // {type: "separator", id: "enfermera-sep-1", label: "Acciones de Coordinador"},
            {
                title: "Modificación de material", icon: FileBox,
                children: [
                    // {title: "Externo", url: "/modificacion-material-externo", icon: FileBox},
                    {title: "Pabellon", url: "/modificacion-material-pabellon", icon: FileBox},
                    {title: "Medico", url: "/modificacion-material-medico", icon: FileBox},
                    {title: "Dental", url: "/modificacion-material-dental", icon: FileBox},
                ],
            },
            // {type: "separator", id: "enfermera-sep-2", label: "Acciones de Operador"},

            {title: "Carga de materiales", url: "/ingreso-carga", icon: Bubbles},
            {title: "Cargas activas", url: "/cargas", icon: Boxes},

            // {type: "separator", id: "enfermera-sep-3", label: "Gestión de Sistema"},

            {title: "Gestión de Usuarios", url: "/usuarios", icon: UserCog},
            {title: "Gestión de Clientes (En Construcción)", url: "/gestion-clientes", icon: UserCog},
        ],
    },
];

// Relación de roles con los labels de los menús
const ROLES = {
    Instrumentista: "Instrumentista",
    Coordinador: "Coordinador",
    Operador: "Operador",
    Administrador: "Administrador"
};

function getVisibleMenuGroups(userRol) {
    // Siempre mostrar la categoría EsterilMed
    if (!userRol) return ["EsterilMed"];
    const visibles = ["EsterilMed"];
    if (userRol === ROLES.Instrumentista) visibles.push("Instrumentista");
    if (userRol === ROLES.Coordinador) visibles.push("Coordinador");
    if (userRol === ROLES.Operador) visibles.push("Operador");
    if (userRol === ROLES.Administrador) visibles.push("Administrador");
    return visibles;
}

export function AppSidebar() {
    const navigate = useNavigate();
    const { isLoggedIn, userName, userRol } = useCurrentUser()

    const handleLogout = async () => {
        // todo send the refresh token to the backend to invalidate it using an endpoint (not implemented yet)
        // clean localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');

        toast.success('Sesión cerrada correctamente.');
        navigate('/login');
    };

    // Solo mostrar los grupos permitidos según el rol
    const visibleGroups = getVisibleMenuGroups(userRol);

    return (
        <Sidebar>
            <SidebarContent>
                {menuGroups
                    .filter(group => visibleGroups.includes(group.label))
                    .map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    if (item.type === "separator") {
                                        return <Spacer
                                            key={`separator-${item.id || Math.random()}`}
                                            label={item.label}
                                        />;
                                    }
                                    return item.children ? (
                                        <Collapsible key={item.title}>
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton className="group">
                                                        {item.icon && <item.icon/>}
                                                        <span>{item.title}</span>
                                                        <ChevronRight
                                                        className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90"/>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children.map((subitem) => (
                                                            <SidebarMenuSubItem key={subitem.title}>
                                                                <SidebarMenuButton asChild>
                                                                    <Link to={subitem.url}>
                                                                        {subitem.icon && <subitem.icon/>}
                                                                        <span>{subitem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link to={item.url}>
                                                    {item.icon && <item.icon/>}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
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
                                <SidebarMenuButton className="group">
                                    <User className="h-5 w-5"/>
                                    <span className="truncate">{ isLoggedIn ? `${userName}` : "Iniciar Sesión"}</span>
                                    <ChevronRight
                                        className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:-rotate-90"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                {isLoggedIn ? (
                                    <>
                                        {/*<DropdownMenuItem>
                                            <User/>
                                            <span>Ver Perfil</span>
                                        </DropdownMenuItem>*/}
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut/>
                                            <span>Cerrar sesión</span>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <DropdownMenuItem onClick={() => navigate('/login')}>
                                        <LogIn />
                                        <span>Iniciar sesión</span>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}