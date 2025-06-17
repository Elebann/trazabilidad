import React, { useState, useEffect, useRef } from "react";
import { z } from "zod";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import { FormModel } from "@/components/FormModel.jsx";
import { useFetchSelectOptions } from "@/hooks/useFetchSelectOptions.js";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button.jsx";
import { createFolioWithMaterials, getFolios } from "@/api/trazabilidad.api.js";
import Subtitle from "@/components/Subtitle.jsx";
import { Trash2 } from "lucide-react";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import { DataTable } from "@/components/DataTable.jsx";
import { materialesAgregadosColumns } from "@/features/columns.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Description} from "@/components/Description.jsx";


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
    // para ir reseteando el formulario de materiales
    const formRef = useRef(null);
    
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
            description: "Detectado automáticamente."
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
            })),
            description: "¿A quién le prestamos el servicio?"
        },
        {
            name: "servicio", label: "Servicio", placeholder: "Seleccione una opción.",
            type: "select",
            options: servicios.map(pres => ({
                value: pres.id.toString(),
                label: pres.servicio
            })),
            description: "¿Qué servicio se está prestando?"
        },
        {
            name: "nfolio", label: "Número de Folio", placeholder: "Ingrese el número de folio/guía.",
            type: "number",
            description: "Número de folio único para este ingreso. No lo podrá editar después."
        }
    ];

    // --- Campos del formulario de materiales ---
    const materialFields = [
        {
            name: "cantidad", label: "Cantidad", placeholder: "Cantidad", type: "number",
            description: "Debe ser un número entero positivo."
        },
        {
            name: "mesterilizacion", label: "Método de Esterilización", placeholder: "Método de esterilización",
            type: "select", options: metEsterilizacion.map(met => ({ value: met.id.toString(), label: met.metodo })),
            description: "¿Vapor o Plasma?"
        },
        {
            name: "tipomaterial", label: "Tipo de Material", placeholder: "Tipo de Material", type: "select",
            options: tiposMateriales.map(tiposMat => ({ value: tiposMat.id.toString(), label: tiposMat.tipo_material })),
            description: "¿Individual o Caja?"
        },
        {
            name: "nombrematerial", label: "Nombre de Material", placeholder: "Nombre de Material", type: "text",
            description: ""
        },
        {
            name: "observacion", label: "Observación", placeholder: "Observación", type: "text",
            description: "Observaciones adicionales sobre el material. Es opcional."
        },
    ];

    const columns = React.useMemo(() => {
        // Obtener las columnas base pasando los arreglos como parámetros
        const baseColumns = materialesAgregadosColumns(metEsterilizacion, tiposMateriales);

        // Modificar la columna de acciones para acceder al estado del componente
        return baseColumns.map(col => {
            if (col.id === "acciones") {
                return {
                    ...col,
                    cell: ({row}) => (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMaterialesAgregados(prev => prev.filter((_, i) => i !== row.index));
                            }}
                            disabled={isLoading}
                        >
                            <Trash2/>
                        </Button>
                    )
                };
            }
            return col;
        });
    }, [metEsterilizacion, tiposMateriales, isLoading]);

    const onSubmitFolio = (data) => {
        toast.promise(
            (async () => {
                try {
                    const response = await getFolios();
                    const foliosExistentes = response.data;
                    const folioExistente = foliosExistentes.some(f => f.nfolio === parseInt(data.nfolio));

                    if (folioExistente) {
                        throw new Error("El número de folio ya existe");
                    }

                    setFolio(data);
                    return data;
                } catch (error) {
                    if (error.message === "El número de folio ya existe") {
                        throw error;
                    }
                    throw new Error("Error al verificar el folio");
                }
            })(),
            {
                loading: 'Verificando si ese número de folio existe...',
                success: 'Datos de folio guardados. Ahora puedes agregar materiales.',
                error: (err) => `${err.message}. Por favor, ingrese otro número de folio.`
            }
        );
    };

    const onSubmitMaterial = (data) => {
        setMaterialesAgregados(prev => [...prev, data]);
        console.log("Material agregado:", data);

        formRef.current?.reset({
            cantidad: "",
            mesterilizacion: data.mesterilizacion,
            tipomaterial: data.tipomaterial,
            nombrematerial: "",
            observacion: ""
        });

        formRef.current?.setFocus("cantidad");

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
            <Description>Para ingresar material, primero deberá crear el folio que contendrá todos los materiales que han llegado. Primero rellene el formulario de folio y luego podrá rellenar el formulario de ingreso de material todas las veces que sea necesario. A medida que va agregando materiales, el resumen será visible en la tabla de al lado</Description>

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
                        id="material-form"
                        schema={materialSchema}
                        fields={materialFields}
                        onSubmit={onSubmitMaterial}
                        ref={formRef}
                        disabled={!folio || isLoading}
                    />
                </div>
                {/* Tabla de materiales agregados */}
                <div className="mb-6 form-caja flex-1 md:w-1/2">

                    <Subtitle>Lista de Materiales</Subtitle>

                    <ScrollArea>
                        <DataTable
                            columns={columns}
                            data={materialesAgregados}
                        />
                    </ScrollArea>
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
