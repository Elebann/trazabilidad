import React from "react";
import {Button} from "@/components/ui/button.jsx";
import {
    Check, PackageCheck, CircleHelp, Bubbles, Pencil,
    Trash2, PackagePlus, PackageOpen, ChevronRight,
    ToggleLeft, ToggleRight
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
        accessorKey: "date_joined",
        header: "Fecha de creación",
        cell: ({ row }) => {
            const date = new Date(row.original.date_joined);
            return date.toLocaleDateString("es-CL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },
    {
        header: "Modificar",
        cell: ({ row }) => <EditUserButton rut={row.original.rut} />
    },
    {
        header: "Eliminar",
        cell: ({row}) => (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="hover:text-white hover:bg-red-800"
                    >
                        <Trash2 className="h-4 w-4"/> Eliminar Usuario
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-800 font-bold">¿Eliminar este usuario ({row.original.nombre})?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="text-red-500">
                                Esta acción no es reversible.
                                <br/>
                                <br />
                                Cuidado: Eliminar este usuario también eliminará TODOS los datos que tengan relación con el empleado. Esto incluye los folios que ingresó, materiales ingresados y recibidos... Todo.
                                <br />
                                <br />
                                <span className="font-medium">¿DESEA CONTINUAR?</span>
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className='bg-red-500 hover:bg-red-800'
                            onClick={() => handleDelete(row.original.rut)}
                        >
                            <Trash2 className="h-4 w-4"/> Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
        header: "Estado",
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
        header: "Cód. Preparación",
        cell: ({ row }) => {
            // Si el estado es Recepcionado (estado con ID 1) mostrar que aún no se ha preparado como para saber este dato
            if (row.original.estado.id === 1) return <span className={"flex items-center gap-2 text-neutral-400 font-medium"}><CircleHelp className="h-4 w-4" /> Falta preparar</span>;
            const codigo = row.original.ultimo_lote?.codigo;
            const handleCopy = (e) => {
                e.stopPropagation();
                if (codigo){
                    navigator.clipboard.writeText(codigo);
                    toast.success(`Código de preparación ${codigo} copiado al portapapeles`);
                }

            };
            return (
                <span
                    className="font-bold cursor-pointer hover:underline"
                    title="Copiar al portapapeles"
                    onClick={handleCopy}
                >
                    {codigo || "Sin lote preparado"}
                </span>
            );
        }
    },
    {
        accessorKey: "metodo_esterilizacion.metodo",
        header: "Mét. Esterilización"
    },
    {
        accessorKey: "control_biologico",
        header: "Control biológico",
        cell: ({ row }) => {
                const { id } = row.original.estado;
                const isRecepcionado = id === 1;

                if (isRecepcionado) {
                    return (
                        <span className="flex items-center gap-2 text-neutral-400 font-medium">
                            <CircleHelp className="h-4 w-4" /> Falta preparar
                        </span>
                    );
                }

                return row.original.control_biologico ? (
                    <span className="text-green-600 flex items-center gap-2">
                        <ToggleRight /> Sí
                    </span>
                ) : (
                    <span className="text-red-500 flex items-center gap-2">
                        <ToggleLeft /> No
                    </span>
                );
            }
    },
    {
        accessorKey: "control_priones",
        header: "Control priones",
        cell: ({ row }) => {
            if (row.original.estado.id === 1) return <span className={"flex items-center gap-2 text-neutral-400 font-medium"}><CircleHelp className="h-4 w-4" /> Falta preparar</span>;
            return row.original.control_priones
                ? <span className="text-green-600 flex items-center gap-2"><ToggleRight /> Sí</span>
                : <span className="text-red-500 flex items-center gap-2"><ToggleLeft /> No</span>;
        }
    },
    {
        accessorKey: "fecha_ingreso",
        header: "Ingreso"
    },
    {
        accessorKey: "agregado_por.nombre",
        header: "Agregado por",
    },
    {
        accessorKey: "tipo_ingreso.tipo_ingreso",
        header: "Tipo de ingreso",
    },
    /*{
        accessorKey: "folio.nfolio",
        header: "Núm. Folio",
    },*/
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

export const activeCargas = [
    {
        accessorKey: "materiales.codigo",
        header: "Cód. Preparación"
    },
    {
        accessorKey: "materiales.preparado_por.nombre",
        header: "Preparado por",
    },
    {
        accessorKey: "materiales.materiales",
        header: "Núm. Materiales cargados",
        cell: ({ row }) => {
            const materialesObj = row.original.materiales;
            // Verifica si está el objeto y si contiene array de mats
            if (!materialesObj || !Array.isArray(materialesObj.materiales)) return 0;
            return materialesObj.materiales.length;
        }
    },
    {
        accessorKey: "fechahora",
        header: "Fecha de carga",
        cell: ({ row }) => {
            const date = new Date(row.original.fechahora);
            return date.toLocaleDateString("es-CL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },
    {
        acceessorKey: "finished",
        header: "Finalizada",
        cell: ({ row }) => {
            const isFinished = row.original.finished;
            return (
                <span className={`flex items-center gap-2 ${isFinished ? 'text-green-600' : 'text-red-500'}`}>
                    {isFinished ? <Check className="h-4 w-4" /> : <CircleHelp className="h-4 w-4" />}
                    {isFinished ? "Sí" : "No"}
                </span>
            );
        }
    }
]

export const prepareMaterialColumns = (seleccionados, seleccionarMaterial) => [
    {
        id: "select",
        header: "Seleccionar",
        cell: ({ row }) => (
            <Checkbox
                checked={seleccionados.some(m => m.id === row.original.id)}
                onCheckedChange={() => seleccionarMaterial(row.original)}
            />
        )
    },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "cantidad", header: "Cantidad" },
    {
        accessorKey: "folio.cliente.nombre",
        header: "Cliente",
        cell: ({ row }) => row.original.folio?.cliente?.nombre || "Sin cliente"
    },
    {
        accessorKey: "folio.nfolio",
        header: "Núm. Folio",
        cell: ({ row }) => row.original.folio?.nfolio || "N/A"
    },
    {
        accessorKey: "comentarios",
        header: "Observación",
        cell: ({ row }) => row.original.comentarios || "-"
    }
];

export const selectedMaterials = [
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "cantidad", header: "Cantidad" },
    {
        accessorKey: "folio.cliente.nombre",
        header: "Cliente",
        cell: ({ row }) => row.original.folio?.cliente?.nombre || "Sin cliente"
    },
    {
        accessorKey: "comentarios",
        header: "Observación",
        cell: ({ row }) => row.original.comentarios || "-"
    }
]

export const detailCarga = [
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "comentarios", header: "Comentarios" },
    {
        accessorKey: "tipo.tipo_material",
        header: "Tipo",
        cell: ({ row }) => row.original.tipo?.tipo_material || "-"
    },
    { accessorKey: "cantidad", header: "Cantidad" },
    {
        accessorKey: "estado.estado",
        header: "Estado",
        cell: ({ row }) => row.original.estado?.estado || "-"
    },
    {
        accessorKey: "metodo_esterilizacion.metodo",
        header: "Método",
        cell: ({ row }) => row.original.metodo_esterilizacion?.metodo || "-"
    },
    {
        accessorKey: "tipo_ingreso.tipo_ingreso",
        header: "Ingreso",
        cell: ({ row }) => row.original.tipo_ingreso?.tipo_ingreso || "-"
    },
    {
        accessorKey: "folio.cliente.nombre",
        header: "Cliente",
    }
]

export const insertCarga = [
    {
        accessorKey: "nombre",
        header: "Nombre del material",
        cell: ({ row }) => row.original.nombre || "Sin nombre"
    },
    {
        accessorKey: "tipo.tipo_material",
        header: "Tipo de material",
        cell: ({ row }) => row.original.tipo?.tipo_material || "Sin tipo"
    },
    {
        accessorKey: "cantidad",
        header: "Cantidad",
        cell: ({ row }) => row.original.cantidad || 0
    },
    {
        accessorKey: "metodo_esterilizacion.metodo",
        header: "Método de esterilización",
        cell: ({ row }) => row.original.metodo_esterilizacion?.metodo || "No especificado"
    },
    {
        accessorKey: "folio.nfolio",
        header: "Núm. Folio",
        cell: ({ row }) => row.original.folio?.nfolio || "Sin folio"
    },
    {
        accessorKey: "comentarios",
        header: "Observación",
        cell: ({ row }) => row.original.comentarios || "-"
    }
];

export const modificacionMaterial = [
    {
        accessorKey: "nombre",
        header: "Nombre"
    },
    {
        accessorKey: "cantidad",
        header: "Cantidad"
    },
    {
        accessorKey: "folio.cliente.nombre",
        header: "Cliente",
        cell: ({ row }) => row.original.folio?.cliente?.nombre || "Sin cliente"
    },
    {
        accessorKey: "folio.nfolio",
        header: "N° Folio",
        cell: ({ row }) => row.original.folio?.nfolio || "N/A"
    },
    {
        accessorKey: "comentarios",
        header: "Comentarios",
        cell: ({ row }) => row.original.comentarios || "-"
    }
]

function EditMaterialButton({ id }) {
        const navigate = useNavigate();
        return (
            <Button
                variant="outline"
                onClick={() => navigate(`/ModificacionMaterial/${id}`)}
                className="hover:bg-esteril-blue-light hover:text-white"
            >
                <Pencil className="h-4 w-4" /> Modificar
            </Button>
        );
    }

export const modificarMaterialBase = [
    {
        accessorKey: "nombre",
        header: "Nombre Material"
    },
    {
        accessorKey: "cantidad",
        header: "Cantidad"
    },
    {
        accessorKey: "folio.cliente.nombre",
        header: "Cliente",
        cell: ({ row }) => row.original.folio?.cliente?.nombre || "Sin cliente"
    },
    {
        accessorKey: "folio.nfolio",
        header: "N° Folio",
        cell: ({ row }) => row.original.folio?.nfolio || "N/A"
    },
    {
        accessorKey: "comentarios",
        header: "Observación",
        cell: ({ row }) => row.original.comentarios || "-"
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <EditMaterialButton id={row.original.id} />
    }
]

export const materialesAgregadosColumns = (metEsterilizacion = [], tiposMateriales = []) => [
    {
        accessorKey: "cantidad",
        header: "Cantidad"
    },
    {
        accessorKey: "mesterilizacion",
        header: "Método",
        cell: ({ row }) => {
            const metodo = metEsterilizacion.find(m => m.id.toString() === row.original.mesterilizacion)?.metodo;
            return metodo || "-";
        }
    },
    {
        accessorKey: "tipomaterial",
        header: "Tipo",
        cell: ({ row }) => {
            const tipo = tiposMateriales.find(t => t.id.toString() === row.original.tipomaterial)?.tipo_material;
            return tipo || "-";
        }
    },
    {
        accessorKey: "nombrematerial",
        header: "Nombre"
    },
    {
        accessorKey: "observacion",
        header: "Observación",
        cell: ({ row }) => row.original.observacion || "-"
    },
    {
        id: "acciones",
        header: "Acción",
        cell: ({ row }) => (
            <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                    e.stopPropagation();
                    const idx = materialesAgregados.findIndex((_, i) => i === row.index);
                    setMaterialesAgregados(prev => prev.filter((_, i) => i !== idx));
                }}
                disabled={isLoading}
            >
                <Trash2 />
            </Button>
        )
    }
];