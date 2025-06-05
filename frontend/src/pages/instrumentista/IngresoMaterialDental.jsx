import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {FormModel} from "@/components/FormModel.jsx";
import React from "react";
import {z} from "zod";
import {useFetchSelectOptions} from "@/hooks/useFetchSelectOptions.js";

export default function IngresoMaterialDental(){
    const {
        usuarios,
        prestaciones,
        clientes,
        metEsterilizacion,
        tiposMateriales,
        materiales
    }
    = useFetchSelectOptions("responsables");

    const schema = z.object({
        responsable: z.string({required_error:"Debe seleccionar una opción."}), //ejemplo con input text
        servicio: z.string({required_error:"Debe seleccionar una opción."}),
        nfolio: z.number({required_error:"Debe ingresar un número."}).int(),
        cliente: z.string({required_error:"Debe seleccionar una opción."}),
        cantidad: z.number({required_error:"Debe ingresar un número."}).int(),
        mesterilizacion: z.string({required_error:"Debe seleccionar una opción."}),
        tipomaterial: z.string({required_error:"Debe seleccionar una opción."}),
        nombrematerial: z.string({required_error:"Debe seleccionar una opción."}),
        observacion: z.string({required_error:"Debe realizar una obsevación."}).max(300, {message: "Exedió el límite de caracteres (300)"}),
        });
    const fields = [
        {
            name: "responsable",
            placeholder: "Responsable de recepción de materiañ",
            label: "Número de Cajas",
            type: "select",
            options: usuarios.map(user => ({
                value: user.rut.toString(),
                label: user.nombre
            }))
        },
        {
            name: "servicio",
            placeholder: "Servicio",
            label: "Servicio",
            type: "select",
            options: prestaciones.map(pres => ({
                value: pres.id.toString(),
                label: pres.prestacion
            }))
        },
        {
            name: "nfolio",
            placeholder: "N°Folio",
            label: "N°Folio",
            type: "number",
        },
        {
            name: "cliente",
            placeholder: "Cliente",
            label: "Cliente",
            type: "select",
            options: clientes.map(clientes => ({
                value: clientes.id.toString(),
                label: clientes.nombre
            }))
        },
        {
            name: "cantidad",
            placeholder: "Cantidad",
            label: "Cantidad",
            type: "number",
        },
        {
            name: "mesterilizacion",
            placeholder: "Método de esterilización",
            label: "Método de esterilización",
            type: "select",
            options: metEsterilizacion.map(met => ({
                value: met.id.toString(),
                label: met.metodo
            })),
        },
        {
            name: "tipomaterial",
            placeholder: "Tipo de material",
            label: "Tipo de material",
            type: "select",
            options: tiposMateriales.map(tipo => ({
                value: tipo.id.toString(),
                label: tipo.tipo_material
            }))
        },
        {
            name: "nombrematerial",
            placeholder: "Nombre de material",
            label: "Nombre de material",
            type: "select",
            options: materiales.map(material => ({
                value: material.id.toString(),
                label: material.nombre
            }))
        },
        {
            name: "observacion",
            placeholder: "Observación",
            label: "Observación",
            type: "text",
        },

    ]
    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
    }

    return (
        <>
            <Main>
                <div className={"form-caja"}>
                    <Title>Dental</Title>
                    <FormModel
                        schema={schema}
                        fields={fields}
                        onSubmit={onSubmit}
                    />
                </div>
            </Main>
        </>
    )
}