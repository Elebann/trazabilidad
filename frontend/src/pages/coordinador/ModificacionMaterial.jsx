import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getMaterial, updateMaterial} from "@/api/trazabilidad.api.js";
import { Button } from "@/components/ui/button.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import toast from "react-hot-toast";
import {FormModel} from "@/components/FormModel.jsx";
import {z} from "zod";
import Subtitle from "@/components/Subtitle.jsx";
import Main from "@/components/Main.jsx";

export default function ModificacionMaterial() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterial = async () => {
            setLoading(true);
            try {
                const response = await getMaterial(id);
                setMaterial(response.data);
            } catch {
                toast.error("Error al cargar el material");
            } finally {
                setLoading(false);
            }
        };
        fetchMaterial();
    }, [id]);

   const schema = z.object({

    });

   const onSubmit = async (data) => {
        const material = {
            nombre: data.nombre,
            cantidad: data.cantidad,
            observacion: data.comentarios,
        };

        console.log(material)

        try {
            const response = await updateMaterial(id, material);
            console.log("Material modificado exitosamente: ", response);
            toast.success(`Material "${material.nombre}" actualizado exitosamente`);
        } catch (error) {
            console.error("Error al actualizar el material:", error.response?.data || error);
            toast.error("Error al actualizar el material. Inténtelo nuevamente");
        }
    };

    if (loading) return <p>Cargando material...</p>;
    if (!material) return <p>No se encontró el material.</p>;
    const fields = [
        {
            name: "nombre",
            label: "Nombre del Material",
            placeholder: "Ingrese el nombre del material",
            type: "text",
        },
        {
            name: "cantidad",
            label: "Cantidad",
            placeholder: "Ingrese nueva cantidad",
            type: "number",

        },
        {
            name: "cliente",
            label: "Cliente",
            placeholder: "Ingrese el cliente",
            type: "text",
        },
        {
            name: "observacion",
            label: "Observación",
            placeholder: "Ingrese nueva observación",
            type: "text",
        },
    ];

    return (
        <Main>
            <Subtitle>Editando Material</Subtitle>
            <div className="rounded-md border mb-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>N° Folio</TableHead>
                            <TableHead>Observación</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{material.nombre}</TableCell>
                            <TableCell>{material.cantidad}</TableCell>
                            <TableCell>{material.folio?.cliente?.nombre || "Sin cliente"}</TableCell>
                            <TableCell>{material.folio?.nfolio || "N/A"}</TableCell>
                            <TableCell>{material.comentarios || "-"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>


            <div className="mb-6 form-caja">
                <Subtitle>Editar Material</Subtitle>
                <FormModel
                        key={material.id}
                        schema={schema}
                        onSubmit={onSubmit}
                        fields={fields}
                        defaultValues={{
                            nombre: material.nombre,
                            cantidad: material.cantidad,
                            cliente: material.folio?.cliente?.nombre,
                            observacion: material.comentarios,
                        }}
                    />
            </div>
        </Main>
    );
}