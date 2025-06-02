import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MoreHorizontal, Check, PackageCheck, CircleHelp, Bubbles, Paperclip, Pencil, Trash2} from "lucide-react";
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom";

function EditUserButton({ rut }) {
    const navigate = useNavigate();
    return (
        <Button
            variant="outline"
            onClick={() => navigate(`/editar-usuario/${rut}`)}
            className="hover:bg-esteril-blue-light hover:text-white"
        >
            <Pencil className="h-4 w-4" /> Modificar
        </Button>
    );
}

// This is used by <Users /> component to display the users in a Data Table
export const userColumns = ({ handleDelete }) => [
    {
        accessorKey: "rut",
        header: "RUT",
        cell: ({row}) => row.original.rut || "Sin rut"
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "rol.rol",
        header: "Rol"
    },
    {
        header: "Modificar",
        cell: ({ row }) => <EditUserButton rut={row.original.rut} />
    },
    {
        header: "Eliminar",
        cell: ({row}) => (
            <Button
                variant="destructive"
                className="hover:text-white hover:bg-red-800"
                onClick={() => handleDelete(row.original.rut)}
            >
                <Trash2 className="h-4 w-4"/> Eliminar Usuario
            </Button>
        )
    },
    {
        header: "Más",
        id: "actions",
        cell: ({row}) => {
            const usuario = row.original
            const notify = () => toast.success('Copiado.');
            return (
                <DropdownMenu>
                    {/* Load Toast Component */}

                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(usuario.rut).then(() => {
                                    notify();
                                });
                            }}
                        >
                            <Paperclip /> Copiar rut del empleado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(usuario.nombre).then(() => {
                                    notify();
                                });
                            }}
                        >
                            <Paperclip /> Copiar nombre del empleado
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

export const folioColumns = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "cliente.id",
        header: "ID Cliente"
    },
    {
        accessorKey: "cliente.nombre",
        header: "Cliente"
    },
    {
        accessorKey: "cliente.prestacion.prestacion",
        header: "Prestación"
    },
    {
        accessorKey: "cliente.estado.estado",
        header: "Estado del cliente"
    },
    {
        accessorKey: "usuario.rut",
        header: "Rut de usuario"
    },
    {
        accessorKey: "usuario.nombre",
        header: "Usuario"
    },
    {
        accessorKey: "material.nombre",
        header: "Material"
    },
    {
        accessorKey: "material.tipo.tipo_material",
        header: "Tipo de material"
    },
    {
        accessorKey: "material.estado.estado",
        header: "Estado",
        cell: ({ row }) => {
            const estadoConfig = {
                1: { color: "text-yellow-600", icon: <PackageCheck />, label: row.original.material.estado.estado },
                2: { color: "text-blue-500", icon: <Bubbles />, label: row.original.material.estado.estado },
                3: { color: "text-green-600", icon: <Check />, label: row.original.material.estado.estado },
                default: { color: "text-red-500", icon: <CircleHelp />, label: "Estado desconocido" },
            };
            const { color, icon, label } = estadoConfig[row.original.material.estado.id] || estadoConfig.default;
            return (
                <span className={`flex items-center gap-2 ${color}`}>
                    {icon} <span>{label}</span>
                </span>
            );
        }
    },
    {
        accessorKey: "fechahora_ingreso",
        header: "Ingreso",
        cell: ({row}) => {
            const date = new Date(row.original.fechahora_ingreso);
            console.log(date);
            return date.toLocaleDateString("es-CL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
]

export const materialsColumns = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "nombre",
        header: "Nombre del material"
    },
    {
        accessorKey: "tipo.tipo_material",
        header: "Tipo de material"
    },
    {
        accessorKey: "estado.estado",
        header: "Estado del material",
        cell: ({ row }) => {
            const estadoConfig = {
                1: { color: "text-yellow-600", icon: <PackageCheck />, label: row.original.estado.estado },
                2: { color: "text-blue-500", icon: <Bubbles />, label: row.original.estado.estado },
                3: { color: "text-green-600", icon: <Check />, label: row.original.estado.estado },
                default: { color: "text-red-500", icon: <CircleHelp />, label: "Estado desconocido" },
            };
            const { color, icon, label } = estadoConfig[row.original.estado.id] || estadoConfig.default;
            return (
                <span className={`flex items-center gap-2 ${color}`}>
                    {icon} <span>{label}</span>
                </span>
            );
        }
    },
    {
        accessorKey: "metodo_esterilizacion.metodo",
        header: "Método de esterilización"
    },
    {
        accessorKey: "tipo_control.tipo_control_material",
        header: "Tipo de control",
    },
    {
        accessorKey: "fecha_ingreso",
        header: "Fecha del ingreso"
    },
    {
        accessorKey: "agregado_por.nombre",
        header: "Agregado por",
    },
    {
        accessorKey: "comentarios",
        header: "Comentarios"
    }
]

export const clientesColumns = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "nombre",
        header: "Nombre"
    },
    {
        accessorKey: "estado.estado",
        header: "Estado",
    },
    {
        accessorKey: "prestacion.prestacion",
        header: "Prestación"
    }
]

export const userEditColumns = [
    {
        accessorKey: "rut",
        header: "RUT del empleado",
        cell: ({ row }) => row.original.rut || "Sin rut"
    },
    {
        accessorKey: "nombre",
        header: "Nombre del empleado"
    },
    {
        accessorKey: "rol.rol",
        header: "Rol del empleado",
        cell: ({ row }) => row.original.rol?.rol || "Sin rol"
    }
]