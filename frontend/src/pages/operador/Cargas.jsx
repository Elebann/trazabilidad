import Title from "@/components/Title.jsx";
import Main from "@/components/Main.jsx";
import {useEffect, useState} from "react";
import {getActiveCargas} from "@/api/trazabilidad.api.js";
import {ExpandableDataTable} from "@/components/ExpandedDataTable.jsx";
import {activeCargas, detailCarga} from "@/features/columns.jsx";
import Subtitle from "@/components/Subtitle.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {PackageCheck} from "lucide-react";
import axios from 'axios';
import toast from 'react-hot-toast';
import {Description} from "@/components/Description.jsx";
import {DataTable} from "@/components/DataTable"

const handleDelete = async (rowData, refreshCargas) => {
    if (!rowData || !rowData.id || !rowData.materiales) {
        toast.error("Datos de carga incompletos");
        return;
    }

    try {
        // 1. Obtener información de la carga actual
        const cargaId = rowData.id;
        const preparacion = rowData.materiales;
        const materiales = preparacion?.materiales || [];

        // 2. Actualizar el estado de todos los materiales a "Esterilizado" (ID 4)
        const updatePromises = materiales.map(material =>
            axios.patch(`http://localhost:8000/app/api/v1/material/${material.id}/`, {
                estado_id: 4 // ID del estado "Esterilizado"
            })
        );

        await Promise.all(updatePromises);

        // 3. Marcar la carga como finalizada
        await axios.patch(`http://localhost:8000/app/api/v1/num-carga/${cargaId}/`, {
            finished: true
        });

        // 4. Refrescar la lista de cargas activas
        refreshCargas();

        toast.success("Proceso de esterilización finalizado correctamente");
    } catch (error) {
        console.error("Error al finalizar el proceso:", error);
        toast.error("Error al finalizar el proceso de esterilización");
    }
};

const CargaDetail = ({ rowData, refreshCargas }) => {
    if (!rowData || !rowData.materiales) return null;

    const preparacion = rowData.materiales;
    const materiales = preparacion.materiales || [];
    console.log("Datos de la preparación:", preparacion);
    console.log("Materiales de la preparación:", materiales);

    return (
        <div className="p-4">
            <div className="mb-4">
                <Subtitle>Información de la preparación</Subtitle>
                <p><span className="font-medium">Código:</span> {preparacion.codigo}</p>
                <p><span className="font-medium">Fecha:</span> {new Date(preparacion.fecha_preparacion).toLocaleString()}</p>
                <p><span className="font-medium">Preparado por:</span> {preparacion.preparado_por?.nombre}</p>
                <p>
                    <span className="font-medium">Controles:</span>
                    {preparacion.control_biologico && preparacion.control_priones
                        ? " Biológico y Priones"
                        : preparacion.control_biologico
                            ? " Biológico"
                            : preparacion.control_priones
                                ? " Priones"
                                : " Ninguno"}
                </p>
            </div>

            <h4 className="text-md font-medium mb-2">Materiales en esta carga ({materiales.length})</h4>
            <div>
                <DataTable
                    data={materiales}
                    columns={detailCarga}
                />

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="mt-4">Finalizar proceso</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="inline-flex items-center">
                                Estás a punto de marcar esta carga como{' '}
                                <span className="inline-flex items-center text-green-600"><PackageCheck className="w-6 h-6 mx-1"/>Esterilizada</span>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Esto finalizará el proceso de trazabilidad, quedando en manos de los encargados de despacho. Cualquier cambio posterior solo podrá ser realizado por un Administrador.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleDelete(rowData, refreshCargas)}
                            >
                                Finalizar proceso
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default function Cargas() {
    const [cargas, setCargas] = useState([]);

    const fetchCargas = async () => {
        try {
            const response = await getActiveCargas();
            setCargas(response.data);
        } catch (error) {
            console.error("Error fetching active cargas:", error);
        }
    };

    useEffect(() => {
        fetchCargas();
    }, []);

    return (
        <>
            <Main>
                <Title>Cargas Activas</Title>
                <Description>Para ver los detalles de las cargas activas, haga clic en alguna fila disponible</Description>

                <ExpandableDataTable
                    data={cargas}
                    columns={activeCargas}
                    renderExpandedRow={(rowData) => <CargaDetail rowData={rowData} refreshCargas={fetchCargas} />}
                />
            </Main>
        </>
    )
}