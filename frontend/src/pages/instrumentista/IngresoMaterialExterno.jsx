import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";

/* Validador */
import { z } from "zod";
import {FormModel} from "@/components/FormModel.jsx";
import "../CSS.css";


function IngresoMaterialPabellon() {

    /* Este es para definir las validaciones, con https://zod.dev/ */
    const schema = z.object({
        responsable: z.string({required_error:"Debe seleccionar una opción."}), //ejemplo con input text
        servicio: z.string({required_error:"Debe seleccionar una opción."}),
        proveedor: z.string({required_error:"Debe seleccionar una opción."}),
        cliente: z.string({required_error:"Debe seleccionar una opción."}),
        medico: z.string({required_error:"Debe ingresar el nombre del médico."}).max(150, {message: "Exedió el límite de caracteres (150)"}),
        paciente: z.string({required_error:"Debe ingresar el nombre del paciente."}).max(150, {message: "Exedió el límite de caracteres (150)"}),
        Nfolio: z.number({required_error:"Debe ingresar un número."}).int(),
        juego: z.string({required_error:"Debe ingresar el nombre del juego."}).max(150, {message: "Exedió el límite de caracteres (150)"}),
        numcajas: z.number({required_error:"Debe ingresar un número."}).int(),
        mesterilizacion: z.string({required_error:"Debe seleccionar una opción."}),
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
            name: "proveedor",
            placeholder: "Proveedor",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ]
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
            name: "medico",
            placeholder: "Nombre de médico",
            type: "text",
        },
        {
            name: "paciente",
            placeholder: "Nombre de paciente",
            type: "text",
        },
        {
            name: "Nfolio",
            placeholder: "N°Folio",
            type: "text",
        },
        {
            name: "juego",
            placeholder: "Nombre de juego",
            type: "text",
        },
        {
            name: "numcajas",
            placeholder: "Número de cajas",
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
    ]

    // función que se ejecuta al enviar el formulario
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <Main>
                <div className={"form-caja"}>
                    <Title>Externo</Title>
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