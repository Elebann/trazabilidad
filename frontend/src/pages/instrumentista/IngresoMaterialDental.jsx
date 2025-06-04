import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {FormModel} from "@/components/FormModel.jsx";
import React from "react";
import {z} from "zod";

export default function IngresoMaterialDental(){

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
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
        },
        {
            name: "servicio",
            placeholder: "Servicio",
            label: "Servicio",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
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
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
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
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
        },
        {
            name: "tipomaterial",
            placeholder: "Tipo de material",
            label: "Tipo de material",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
        },
        {
            name: "nombrematerial",
            placeholder: "Nombre de material",
            label: "Nombre de material",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
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