import React from "react";
import {Button} from "@/components/ui/button.jsx";
import {Check, PackageCheck, CircleHelp, Bubbles, Pencil, Trash2, PackagePlus, PackageOpen} from "lucide-react";
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
    }
];

export const folioColumns = [
    {
        accessorKey: "nfolio",
        header: "Núm. Folio"
    },
    /*{
        accessorKey: "cliente.id",
        header: "ID Cliente"
    },*/
    {
        accessorKey: "cliente.nombre",
        header: "Cliente"
    },
    {
        accessorKey: "cliente.estado.estado",
        header: "Estado del cliente"
    },
    {
        accessorKey: "servicio.servicio",
        header: "Servicio"
    },
    {
        accessorKey: "ingresado.nombre",
        header: "Ingresado por"
    },
    {
        accessorKey: "recepcionado.nombre",
        header: "Recepcionado por"
    },
    {
        accessorKey: "fechahora_ingreso",
        header: "Ingreso",
        cell: ({row}) => {
            const date = new Date(row.original.fechahora_ingreso);
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
    /*{
        accessorKey: "id",
        header: "#"
    },*/
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
            const materialData = row.original;
            const estadoConfig = {
                1: { color: "text-yellow-600", icon: <PackagePlus />, label: row.original.estado.estado },
                2: { color: "text-blue-500", icon: <PackageOpen />, label: row.original.estado.estado },
                3: { color: "text-purple-500", icon: <Bubbles />, label: row.original.estado.estado },
                4: { color: "text-green-600", icon: <Check />, label: row.original.estado.estado },
                default: { color: "text-red-500", icon: <CircleHelp />, label: "Estado desconocido" },
            };
            const { color, icon, label } = estadoConfig[materialData.estado.id] || estadoConfig.default;
            const labelContent = typeof label === 'function' ? label() : label;
            return (
                <span className={`flex items-center gap-2 ${color}`}>
                    {icon} <span>{labelContent}</span>
                </span>
            );
        }
    },
    {
        accessorKey: "ultimo_lote.codigo",
        header: "Lote preparado",
        cell: ({ row }) => {
            // Si el estado es Recepcionado (estado con ID 1) mostrar que aún no se ha preparado como para saber este dato
            if (row.original.estado.id === 1) return <span className={"flex items-center gap-2"}>Falta preparar</span>;
            return <span className="font-bold">{row.original.ultimo_lote?.codigo}</span> || "Sin lote preparado";
        }
    },
    {
        accessorKey: "metodo_esterilizacion.metodo",
        header: "Método de esterilización"
    },
    {
        accessorKey: "control_biologico",
        header: "Control biológico",
        cell: ({ row }) => {
            // Si el estado es Recepcionado (estado con ID 1) mostrar que aún no se ha preparado como para saber este dato
            if (row.original.estado.id === 1) return <span className={"flex items-center gap-2"}>Falta preparar</span>;
            // En otro caso, mostrar si tiene control biológico o no
            return row.original.control_biologico
                ? <span className="text-green-600">Sí</span>
                : <span className="text-red-500">No</span>;
        }
    },
    {
        accessorKey: "control_priones",
        header: "Control priones",
        cell: ({ row }) => {
            if (row.original.estado.id === 1) return <span className={"flex items-center gap-2"}>Falta preparar</span>;
            return row.original.control_priones
                ? <span className="text-green-600">Sí</span>
                : <span className="text-red-500">No</span>;
        }
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
        accessorKey: "tipo_ingreso.tipo_ingreso",
        header: "Tipo de ingreso",
    },
    {
        accessorKey: "folio.nfolio",
        header: "Núm. Folio",
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