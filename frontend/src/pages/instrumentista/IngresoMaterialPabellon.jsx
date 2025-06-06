import React, { useState } from "react";
import { z } from "zod";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import { FormModel } from "@/components/FormModel.jsx";
import { useFetchSelectOptions } from "@/hooks/useFetchSelectOptions.js";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Button} from "@/components/ui/button.jsx";
import { createFolio, createMaterial } from "@/api/trazabilidad.api.js";
import Subtitle from "@/components/Subtitle.jsx";
import { Trash2 } from "lucide-react";

function IngresoMaterialPabellon() {
    const { clientes, metEsterilizacion, usuarios,
            servicios, tiposMateriales, materiales }
        = useFetchSelectOptions();

    // Estado para el folio creado y para los materiales agregados
    const [folio, setFolio] = useState(null);
    const [materialesAgregados, setMaterialesAgregados] = useState([]);

    // --- Formulario 1: Crear Folio ---
    const folioSchema = z.object({
        responsable: z.string({ required_error: "Debe seleccionar una opción." }),
        cliente: z.string({ required_error: "Debe seleccionar una opción." }),
        servicio: z.string({ required_error: "Debe seleccionar una opción." }),
        Nfolio: z.number({ required_error: "Debe ingresar un número." }).int(),
    });

    const folioFields = [
        {
            name: "responsable", label: "Responsable", placeholder: "Responsable de recepción de material",
            type: "select",
            options: usuarios.map(user => ({
                value: user.rut.toString(),
                label: user.nombre
            }))
        },
        {
            name: "cliente", label: "Cliente", placeholder: "Cliente",
            type: "select",
            options: clientes.map(cliente => ({
                value: cliente.id.toString(),
                label: cliente.nombre
            }))
        },
        {
            name: "servicio", label: "Servicio", placeholder: "Servicio",
            type: "select",
            options: servicios.map(pres => ({
                value: pres.id.toString(),
                label: pres.servicio
            }))
        },
        // todo esto es un numero que se ingresa manual o se debería seleccionar? o agregar automáticamente (autoincremental)?
        { name: "Nfolio",  label: "Número de Folio",  placeholder: "N°Folio",  type: "number" }
    ];

    const onSubmitFolio = async (data) => {
        setFolio({ ...data, id: Date.now() }); // Simulating todo make the api call
        toast.success("Folio creado. Ahora puedes agregar materiales.");
    };

    // --- Formulario 2: Agregar Material ---
    const materialSchema = z.object({
        cantidad: z.number({ required_error: "Debe ingresar un número." }).int(),
        mesterilizacion: z.string({ required_error: "Debe seleccionar una opción." }),
        tipomaterial: z.string({ required_error: "Debe seleccionar una opción." }),
        nombrematerial: z.string({ required_error: "Debe seleccionar una opción." }),
        observacion: z.string({ required_error: "Debe realizar una observación." }).max(300, { message: "Excedió el límite de caracteres (300)" }),
    });

    const materialFields = [
        {
            name: "cantidad", label: "Cantidad", placeholder: "Cantidad", type: "number"
        },
        {
            name: "mesterilizacion", label: "Método de Esterilización", placeholder: "Método de esterilización",
            type: "select", options: metEsterilizacion.map(met => ({ value: met.id.toString(), label: met.metodo }))
        },
        {
            name: "tipomaterial", label: "Tipo de Material", placeholder: "Tipo de Material", type: "select",
            options: tiposMateriales.map(tiposMat => ({ value: tiposMat.id.toString(), label: tiposMat.tipo_material })),
        },
        {
            name: "nombrematerial", label: "Nombre de Material", placeholder: "Nombre de Material", type: "select",
            // todo asegurarse que se refiere al nombre de un material ya existente (select) o se agrega aquí un nuevo material (text)
            options: materiales.map(material => ({ value: material.id.toString(), label: material.nombre })),
        },
        {
            name: "observacion", label: "Observación", placeholder: "Observación", type: "text",
        },
    ];

    const onSubmitMaterial = (data) => {
        setMaterialesAgregados(prev => [...prev, data]);
        toast.success("Material agregado.");
    };

    // --- Finalizar: Enviar a la base de datos ---
    const finalizarIngreso = async () => {
        // Aquí deberías enviar el folio y los materiales a la API
        // await createFolioAndMaterials(folio, materialesAgregados);
        console.log("Folio creado:", folio);
        console.log("Materiales agregados:", materialesAgregados);

        toast.success("Ingreso finalizado y guardado.");
        setFolio(null);
        setMaterialesAgregados([]);
    };

    return (
        <Main>
            <Title>Pabellón</Title>

            {/* Formulario 1: Folio */}
            <div className="mb-6 form-caja">
                <Subtitle>Crear Folio</Subtitle>
                <FormModel
                    schema={folioSchema}
                    fields={folioFields}
                    onSubmit={onSubmitFolio}
                    disabled={!!folio}
                />
            </div>

            {/* Formulario 2: Materiales */}
            <div className="flex gap-6 flex-col md:flex-row">
                <div className="mb-6 form-caja flex-1 md:w-1/2">
                    <Subtitle>Agregar Materiales</Subtitle>
                    <FormModel
                        schema={materialSchema}
                        fields={materialFields}
                        onSubmit={onSubmitMaterial}
                        disabled={!folio}
                    />
                </div>
                {/* Tabla de materiales agregados */}
                <div className="mb-6 form-caja flex-1 md:w-1/2">
                    <Subtitle>Materiales que se agregarán {folio?.Nfolio && `al folio N° ${folio.Nfolio}`}</Subtitle>
                    <Table className="border rounded-2xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Servicio</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Método</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Observación</TableHead>
                                <TableHead>Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                    {materialesAgregados.length > 0 && (
                        <TableBody>
                            {materialesAgregados.map((mat, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{servicios.find(s => s.id.toString() === (mat.servicio || folio?.servicio))?.servicio}</TableCell>
                                    <TableCell>{mat.cantidad}</TableCell>
                                    <TableCell>{metEsterilizacion.find(m => m.id.toString() === mat.mesterilizacion)?.metodo}</TableCell>
                                    <TableCell>{tiposMateriales.find(t => t.id.toString() === mat.tipomaterial)?.tipo_material}</TableCell>
                                    <TableCell>{materiales.find(m => m.id.toString() === mat.nombrematerial)?.nombre}</TableCell>
                                    <TableCell>{mat.observacion}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setMaterialesAgregados(prev => prev.filter((_, i) => i !== idx))}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                    </Table>
                </div>
            </div>

            {folio && materialesAgregados.length > 0 && (
                <Button
                    className="btn btn-primary"
                    onClick={finalizarIngreso}
                >
                    Finalizar ingreso
                </Button>
            )}
        </Main>
    );
}

export default IngresoMaterialPabellon;