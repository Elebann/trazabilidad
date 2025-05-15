import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";

export default function IngresoMaterial() {
    return (
        <div>
            <Main>
                <Title>Ingreso de Material</Title>
                <p>Página para el ingreso del material.</p>
                <p>Esta página solo debe verse para quienes tengan el rol: <span className={"font-bold text-orange-300"}>Instrumentista</span></p>
            </Main>
        </div>
    )
}