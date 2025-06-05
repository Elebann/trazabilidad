import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";
import {useFetchSelectOptions} from "@/hooks/useFetchSelectOptions.js";

/* Validador */
import { z } from "zod";
import {FormModel} from "@/components/FormModel.jsx";
import "../CSS.css";

function IngresoMaterialMedico() {
    const {
        clientes,
        metEsterilizacion,
        usuarios,
        servicios,
        tiposMateriales,
        materiales
    } = useFetchSelectOptions(); // custom hook para obtener las opciones del formulario

    /* Este es para definir las validaciones, con https://zod.dev/ */
    const schema = z.object({
        /* todo las relaciones entre tablas deben recibir el valor como número, transformar los que hagan falta.
        *  si no recuerdo mal, hay un ejemplo en el schema del rol de EditarUsuario.jsx */
        responsable: z.string({required_error:"Debe seleccionar una opción."}), //ejemplo con input text
        servicio: z.string({required_error:"Debe seleccionar una opción."}),
        proveedor: z.string({required_error:"Debe seleccionar una opción."}),
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
            label: "Responsable",
            placeholder: "Responsable de recepción de material",
            type: "select",
            options: usuarios.map(user => ({
                value: user.rut.toString(),
                label: user.nombre
            })),
        },
        {
            name: "servicio",
            label: "Servicio",
            placeholder: "Servicio",
            type: "select",
            // todo esto hace referencia a la tabla prestación? u otra?
            options: servicios.map(servicio => ({
                value: servicio.id.toString(),
                label: servicio.servicio
            })),
        },
        {
            name: "proveedor",
            label: "Proveedor",
            placeholder: "Proveedor",
            type: "select",
            // todo preguntar que es esto y a que valor apunta.
            options: [
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
                { value: "3", label: "Opción 3" },
            ],
            description: "(Hardcoded)"
        },
        {
            name: "cliente",
            label: "Cliente",
            placeholder: "Cliente",
            type: "select",
            options: clientes.map(cliente => ({
                value: cliente.id.toString(),
                label: cliente.nombre
            })),
        },
        {
            name: "cantidad",
            label: "Cantidad",
            placeholder: "Cantidad",
            type: "number",
        },
        {
            name: "mesterilizacion",
            label: "Método de Esterilización",
            placeholder: "Método de esterilización",
            type: "select",
            options: metEsterilizacion.map(met => ({
                value: met.id.toString(),
                label: met.metodo
            })),
        },
        {
            name: "tipomaterial",
            label: "Tipo de Material",
            placeholder: "Tipo de Material",
            type: "select",
            options: tiposMateriales.map(tiposMat => ({
                value: tiposMat.id.toString(),
                label: tiposMat.tipo_material
            })),
        },
        {
            name: "nombrematerial",
            label: "Nombre de Material",
            placeholder: "Nombre de Material",
            type: "select",
            // todo asegurarse que se refiere al nombre de un material ya existente (select) o se agrega aquí un nuevo material (text)
            options: materiales.map(material => ({
                value: material.id.toString(),
                label: material.nombre
            })),
        },
        {
            name: "observacion",
            label: "Observación",
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
                    <Title>Médico</Title>
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

export default IngresoMaterialMedico;