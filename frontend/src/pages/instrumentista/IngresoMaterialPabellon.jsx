/* Validador */
import { z } from "zod";
import React from 'react';
/* Este main solo devuelve un <Main> estilizado */
import Main from "@/components/Main.jsx";
/* Este main solo devuelve un <h1> estilizado */
import Title from "@/components/Title.jsx";
import {FormModel} from "@/components/FormModel.jsx";

function IngresoMaterialPabellon() {

    /* Este es para definir las validaciones, con https://zod.dev/ */
    const schema = z.object({
        responsable: z.string({required_error:"Debe seleccionar una opción."}),
        servicio: z.string({required_error:"Debe seleccionar una opción."}),
        Nfolio: z.number({required_error:"Debe ingresar un número."}).int(),
        cliente: z.string({required_error:"Debe seleccionar una opción."}),
        cantidad: z.number({required_error:"Debe ingresar un número."}).int(),
        mesterilizacion: z.string({required_error:"Debe seleccionar una opción."}),
        tipomaterial: z.string({required_error:"Debe seleccionar una opción."}),
        nombrematerial: z.string({required_error:"Debe seleccionar una opción."}),
        observacion: z.string({required_error:"Debe realizar una obsevación."}).max(300, {message: "Exedió el límite de caracteres (300)"}),
        });

    // Aquí se definen los campos del form. los KEY son atributos de HTML
    const fields = [
        {
            name: "responsable",
            placeholder: "Responsable de recepción de material",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
        },
        {
            name: "servicio",
            placeholder: "Servicio",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
        },
        {
            name: "Nfolio",
            placeholder: "N°Folio",
            type: "text",
        },
        {
            name: "cliente",
            placeholder: "Cliente",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
        },
        {
            name: "cantidad",
            placeholder: "Cantidad",
            type: "number",
        },
        {
            name: "mesterilizacion",
            placeholder: "Método de esterilización",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
        },
        {
            name: "tipomaterial",
            placeholder: "Tipo de Material",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
        },
        {
            name: "nombrematerial",
            placeholder: "Nombre de Material",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
        },
        {
            name: "observacion",
            placeholder: "Observación",
            type: "text",
        },

    ]

    // función que se ejecuta al enviar el formulario
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Main>
                <div className={"form-caja"}>
                    <Title>Pabellón</Title>
                    <FormModel
                        schema={schema}
                        fields={fields}
                        onSubmit={onSubmit}
                    />
                </div>
            </Main>
        </>
    );
}

export default IngresoMaterialPabellon;