import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";

export default function IngresoCarga(){
    return (
        <div>
            <Main>
                <Title>Ingreso de Cargas</Title>
                <p>Página para el ingreso de cargas</p>
                <p>Esta página solo debe verse para quienes tengan el rol: <span className={"font-bold text-orange-300"}>OPERADOR</span></p>
            </Main>
        </div>
    )
}