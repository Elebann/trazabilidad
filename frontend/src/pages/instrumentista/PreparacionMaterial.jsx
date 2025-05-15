import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";

export default function PreparacionMaterial(){
    return (
        <div>
            <Main>
                <Title>Preparación de Material</Title>
                <p>Página para la preparación del Material</p>
                <p>Esta página solo debe verse para quienes tengan el rol: <span className={"font-bold text-orange-300"}>Instrumentista</span></p>
            </Main>
        </div>
    )
}