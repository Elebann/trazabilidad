import React, { useState, useEffect } from "react";
import { z } from "zod";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import { FormModel } from "@/components/FormModel.jsx";
import { useFetchSelectOptions } from "@/hooks/useFetchSelectOptions.js";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button.jsx";
import { createFolioWithMaterials } from "@/api/trazabilidad.api.js";
import Subtitle from "@/components/Subtitle.jsx";
import { Trash2 } from "lucide-react";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";


function IngresoMaterialBase({ tipoTitulo, findTipoIngreso }) {
    // tipoTitulo: "Pabellón", "Médico" o "Dental", se mostrará en el título de la página
    // findTipoIngreso: "Pabellón", "Médico" o "Dental", se usará para buscar el tipo de ingreso específico en la API. Debe coincidir la palabra exacta, cuidado las mayúsculas y minúsculas.

    // Obtener las opciones de selección desde el hook personalizado
    const { 
        clientes, 
        metEsterilizacion, 
        usuarios, 
        servicios, 
        tiposMateriales,
        estadosMaterial, 
        tiposIngreso 
    } = useFetchSelectOptions();
    
    // Estado para el folio creado y para los materiales agregados
    const [folio, setFolio] = useState(null);
    const [materialesAgregados, setMaterialesAgregados] = useState([]);
    // Estado para el loading del botón de finalizar ingreso
    const [isLoading, setIsLoading] = useState(false);
    // Constantes para los valores predeterminados
    const [tipoIngresoEspecifico, setTipoIngresoEspecifico] = useState(null);
    const [estadoRecepcionado, setEstadoRecepcionado] = useState(null);
    // Obtener el RUT del usuario logueado
    const { userRut } = useCurrentUser();
    
    // Buscar los IDs necesarios para el tipo de ingreso y estado
    useEffect(() => {
        if (tiposIngreso.length > 0) {
            const tipoEncontrado = tiposIngreso.find(t => t.tipo_ingreso === findTipoIngreso);
            if (tipoEncontrado) setTipoIngresoEspecifico(tipoEncontrado.id);
        }
        
        if (estadosMaterial.length > 0) {
            const recepcionado = estadosMaterial.find(e => e.estado === "Recepcionado");
            if (recepcionado) setEstadoRecepcionado(recepcionado.id);
        }

        // obtener el usuario logueado con LS como responsable por defecto
    }, [tiposIngreso, estadosMaterial, findTipoIngreso]);


    // --- Formulario 1: Crear Folio ---
    const folioSchema = z.object({
        responsable: z.string({ required_error: "Debe seleccionar una opción." }),
        recepcionista: z.string({ required_error: "Debe seleccionar una opción." }),
        cliente: z.string({ required_error: "Debe seleccionar una opción." }),
        servicio: z.string({ required_error: "Debe seleccionar una opción." }),
        nfolio: z.number({ required_error: "Debe seleccionar un número." }).positive("El número debe ser positivo")
    });
    
    // --- Formulario 2: Agregar Material ---
    const materialSchema = z.object({
        cantidad: z.number({ required_error: "Debe ingresar un número." }).int().positive(),
        mesterilizacion: z.string({ required_error: "Debe seleccionar una opción." }),
        tipomaterial: z.string({ required_error: "Debe seleccionar una opción." }),
        nombrematerial: z.string({ required_error: "Debe seleccionar una opción." }),
        observacion: z.string().optional(),
    });

    // --- Campos del formulario de folio ---
    const folioFields = [
        {
            name: "responsable", label: "Responsable de ingreso", placeholder: "No se pudo detectar automáticamente. Seleccione un usuario.",
            type: "select",
            options: usuarios.map(user => ({
                value: user.rut.toString(),
                label: user.nombre
            })),
            description: "Detectado automáticamente si hay sesión iniciada."
        },
        {
            name: "recepcionista", label: "Responsable de recepción", placeholder: "Seleccione una opción.",
            type: "select",
            options: usuarios.map(user => ({
                value: user.rut.toString(),
                label: user.nombre
            })),
            description: "¿Quién fue a buscar el material?"
        },
        {
            name: "cliente", label: "Cliente", placeholder: "Seleccione una opción.",
            type: "select",
            options: clientes.map(cliente => ({
                value: cliente.id.toString(),
                label: cliente.nombre
            }))
        },
        {
            name: "servicio", label: "Servicio", placeholder: "Seleccione una opción.",
            type: "select",
            options: servicios.map(pres => ({
                value: pres.id.toString(),
                label: pres.servicio
            }))
        },
        {
            name: "nfolio", label: "Número de Folio", placeholder: "Ingrese el número de folio/guía",
            type: "number",
            description: "Número de folio único para este ingreso. No lo podrá editar después."
        }
    ];

    // --- Campos del formulario de materiales ---
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
            name: "nombrematerial", label: "Nombre de Material", placeholder: "Nombre de Material", type: "text"
        },
        {
            name: "observacion", label: "Observación", placeholder: "Observación (opcional)", type: "text",
        },
    ];

    const onSubmitFolio = (data) => {
        setFolio(data);
        console.log("Folio creado:", data);
        toast.success("Datos de folio guardados. Ahora puedes agregar materiales.");
    };

    const onSubmitMaterial = (data) => {
        setMaterialesAgregados(prev => [...prev, data]);
        console.log("Material agregado:", data);
        toast.success("Material agregado a la lista.");
    };

    // --- Finalizar: Enviar a la base de datos ---
    const finalizarIngreso = async () => {
        if (!folio || materialesAgregados.length === 0) {
            toast.error("No se puede finalizar. Faltan datos de folio o materiales.");
            return;
        }

        if (!tipoIngresoEspecifico || !estadoRecepcionado) {
            toast.error("No se pudo determinar el tipo de ingreso o estado del material.");
            return;
        }

        setIsLoading(true);

        try {
            // Formatear el folio para la API
            const folioData = {
                ingresado: folio.responsable,
                recepcionado: folio.recepcionista,
                cliente: folio.cliente,
                servicio: folio.servicio,
                nfolio: folio.nfolio,
                fechahora_ingreso: new Date().toISOString()
            };

            // Formatear los materiales para la API
            const materialesData = materialesAgregados.map(material => ({
                cantidad: material.cantidad,
                metodo_esterilizacion: material.mesterilizacion,
                tipo: material.tipomaterial,
                nombre: material.nombrematerial,
                comentarios: material.observacion || "",
                // datos no ingresados por el usuario pero necesarios
                fecha_ingreso: new Date().toISOString().split('T')[0], // Solo la fecha YYYY-MM-DD
                estado: estadoRecepcionado,
                agregado_por: folio.responsable,
                tipo_ingreso: tipoIngresoEspecifico
            }));

            console.log("Enviando folio:", folioData);
            console.log("Enviando materiales:", materialesData);

            // Llamar a la API para crear el folio y los materiales
            await createFolioWithMaterials(folioData, materialesData);
            
            toast.success("Ingreso finalizado y guardado correctamente.");
            
            // Reiniciar el formulario
            setFolio(null);
            setMaterialesAgregados([]);
        } catch (error) {
            console.error("Error al finalizar el ingreso:", error);
            toast.error("Ocurrió un error al guardar los datos. Intente nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Main>
            <Title>Ingreso Material {tipoTitulo}</Title>

            {/* Formulario 1: Folio */}
            <div className="mb-6 form-caja">
                <Subtitle>Datos del Folio</Subtitle>
                <FormModel
                    id="folio-form"
                    schema={folioSchema}
                    fields={folioFields}
                    onSubmit={onSubmitFolio}
                    disabled={!!folio}
                    key={userRut}
                    defaultValues={
                        userRut ? { responsable: userRut } : {}
                    }
                />
                {folio && (
                    <Button 
                        variant="outline"
                        className="mt-2"
                        onClick={() => setFolio(null)}
                    >
                        Editar datos del folio
                    </Button>
                )}
            </div>

            {/* Formulario 2: Materiales */}
            <div className="flex gap-6 flex-col md:flex-row">
                <div className="mb-6 form-caja flex-1 md:w-1/2">
                    <Subtitle>Agregar Materiales</Subtitle>
                    <FormModel
                        schema={materialSchema}
                        fields={materialFields}
                        onSubmit={onSubmitMaterial}
                        disabled={!folio || isLoading}
                    />
                </div>
                {/* Tabla de materiales agregados */}
                <div className="mb-6 form-caja flex-1 md:w-1/2">
                    <Subtitle>Lista de Materiales</Subtitle>
                    <Table className="border rounded-2xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Método</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Observación</TableHead>
                                <TableHead>Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materialesAgregados.length > 0 ? (
                                materialesAgregados.map((mat, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{mat.cantidad}</TableCell>
                                        <TableCell>{metEsterilizacion.find(m => m.id.toString() === mat.mesterilizacion)?.metodo}</TableCell>
                                        <TableCell>{tiposMateriales.find(t => t.id.toString() === mat.tipomaterial)?.tipo_material}</TableCell>
                                        <TableCell>{mat.nombrematerial}</TableCell>
                                        <TableCell>{mat.observacion || "-"}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setMaterialesAgregados(prev => prev.filter((_, i) => i !== idx))}
                                                disabled={isLoading}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center">No hay materiales agregados</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {folio && materialesAgregados.length > 0 && (
                <div className="flex items-center gap-2">
                    <Button
                        className="btn btn-primary"
                        onClick={finalizarIngreso}
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando..." : "Finalizar ingreso"}
                    </Button>
                    <p className="text-neutral-400">Se ingresará automáticamente la fecha y la hora, y el estado del material Recepcionado</p>
                </div>
            )}
        </Main>
    );
}

export default IngresoMaterialBase;
