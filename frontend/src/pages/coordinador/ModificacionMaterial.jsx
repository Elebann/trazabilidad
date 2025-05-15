import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";

export default function ModificacionMaterial() {
    return (
        <div>
            <Main>
                <Title>Modificación del Material</Title>
                <p>Página para la modificación del material.</p>
                <p>Esta página solo debe verse para quienes tengan el rol: <span className={"font-bold text-orange-300"}>COORDINADOR</span></p>
            </Main>
        </div>
    )
}