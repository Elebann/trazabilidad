import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MoreHorizontal} from "lucide-react";
import toast from 'react-hot-toast';
import {Paperclip, Pencil, Trash2 } from "lucide-react";

// This is used by <Users /> component to display the users in a Data Table
export const userColumns = [
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
        cell: () => {
            return(
                <Button variant="outline">
                    <Pencil className="h-4 w-4"/> Modificar
                </Button>
            )
        }
    },{
        header: "Eliminar",
        cell: () => {
            return(
                <Button variant="destructive" className="hover:text-white hover:bg-red-800">
                    <Trash2 className="h-4 w-4"/> Eliminar Usuario
                </Button>
            )
        }
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
        header: "ID Folio"
    },
    {
        accessorKey: "cliente.id",
        header: "ID Cliente"
    },
    {
        accessorKey: "cliente.nombre",
        header: "Nombre Cliente"
    },
    {
        accessorKey: "cliente.prestacion.prestacion",
        header: "Tipo de prestación"
    },
    {
        accessorKey: "cliente.estado.estado",
        header: "Estado del cliente"
    },
    {
        accessorKey: "usuario.rut",
        header: "Rut de Usuario"
    },
    {
        accessorKey: "usuario.nombre",
        header: "Nombre Usuario"
    },
    {
        accessorKey: "material.nombre",
        header: "Nombre Material"
    },
    {
        accessorKey: "material.tipo.tipo_material",
        header: "Tipo de material"
    },
    {
        accessorKey: "material.estado.estado",
        header: "Estado de Material"
    },
    {
        accessorKey: "fechahora_ingreso",
        header: "Fecha de ingreso",
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