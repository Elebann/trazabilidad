import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";
import {Switch} from "@/components/ui/switch.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function PreparacionMaterialMedico(){
    return (
        <div>
            <Main>
                <Title>Médico</Title>
                <p>TABLA 1</p>
                <Title>Seleccionados</Title>
                <p>TABLA 2</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "3rem" }}><div style={{ textAlign: "center" }}>
                        <h2 style={{ marginBottom: "1rem" }}>Control Biologico</h2>
                        <div style={{ transform: "scale(1.5)" }}><Switch />
                        </div>
                    </div><div style={{ textAlign: "center" }}>
                        <h2 style={{ marginBottom: "1rem" }}>Control de Priones</h2>
                        <div style={{ transform: "scale(1.5)" }}><Switch />
                        </div>
                    </div>
                    </div>
                    <div style={{ transform: "scale(1.5)",marginRight:"2rem" }}><Button variant="destructive">Imprimir</Button>
                    </div>
                </div>

            </Main>
        </div>
    )
}