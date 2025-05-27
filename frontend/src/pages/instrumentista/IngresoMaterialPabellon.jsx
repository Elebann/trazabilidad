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
            selector: z.string().min(1, {message: "Debe seleccionar una opción."}), //ejemplo con input text
        });

    // Aquí se definen los campos del form. los KEY son atributos de HTML
    const fields = [
        {
            name: "selector",
            label: "LO DE ARRIBA",
            placeholder: "Seleccione una opción",
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
                <Title>Josefa</Title>

                {/* Componente que facilita la creación de formularios */}
                <FormModel
                    schema={schema}
                    fields={fields}
                    onSubmit={onSubmit}
                    defaultValues={{
                        selector: "1", // Default value for the select field
                    }}
                />
            </Main>
        </>
    );
}

export default IngresoMaterialPabellon;