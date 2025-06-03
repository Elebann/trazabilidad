import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";
import {useFetchSelectOptions} from "@/hooks/useFetchSelectOptions.js";

/* Validador */
import { z } from "zod";
import {FormModel} from "@/components/FormModel.jsx";
import "../CSS.css";


function IngresoMaterialPabellon() {
    const {
        clientes,
        metEsterilizacion,
        usuarios,
        prestaciones,
    } = useFetchSelectOptions();

    /* Este es para definir las validaciones, con https://zod.dev/ */
    // todo el value del responsable debe transformarse a un número, porque el backend espera un rut (número)
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
            label: "Responsable",
            type: "select",
            options: usuarios.map(user => ({
                value: user.rut.toString(),
                label: user.nombre
            })),
            description: "El responsable es el usuario que recibe el material.",
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
            name: "proveedor",
            placeholder: "Proveedor",
            label: "Proveedor",
            type: "select",
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
            description: "(Hardcoded)"
        },
        {
            name: "cliente",
            placeholder: "Cliente",
            label: "Cliente",
            type: "select",
            options: clientes.map(cliente => ({
                value: cliente.id.toString(),
                label: cliente.nombre
            }))
        },
        {
            name: "medico",
            placeholder: "Nombre de médico",
            label: "Médico",
            type: "text",
        },
        {
            name: "paciente",
            placeholder: "Nombre de paciente",
            label: "Paciente",
            type: "text",
        },
        {
            name: "Nfolio",
            placeholder: "N°Folio",
            label: "Número de Folio",
            type: "text",
        },
        {
            name: "juego",
            placeholder: "Nombre de juego",
            label: "Juego",
            type: "text",
        },
        {
            name: "numcajas",
            placeholder: "Número de cajas",
            label: "Número de Cajas",
            type: "number",
        },
        {
            name: "mesterilizacion",
            placeholder: "Método de esterilización",
            label: "Método de Esterilización",
            type: "select",
            options: metEsterilizacion.map(met => ({
                value: met.id.toString(),
                label: met.metodo
            }))
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