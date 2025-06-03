import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {FormModel} from "@/components/FormModel.jsx";
import React from "react";
import {z} from "zod";

export default function IngresoMaterialDental(){

    const schema = z.object({});
    const fields = [

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