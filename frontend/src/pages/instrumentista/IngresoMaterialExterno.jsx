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
            responsable: z.string().min(1, {message: "Debe seleccionar una opción."}), //ejemplo con input text
            servicio: z.string().min(1, {message: "Debe seleccionar una opción."}),
            proveedor: z.string().min(1, {message: "Debe seleccionar una opción."}),
            cliente: z.string().min(1, {message: "Debe seleccionar una opción."}),
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
    ]

    // función que se ejecuta al enviar el formulario
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <Main>
                <div className={"form-caja"}>
                    <Title>Ingreso de Material Externo</Title>
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