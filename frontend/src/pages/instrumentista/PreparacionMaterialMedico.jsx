import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React from "react";
import {Switch} from "@/components/ui/switch.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PrepararMaterialBase} from "@/components/PrepararMaterialBase.jsx";

export default function PreparacionMaterialMedico(){
    return (
        <PrepararMaterialBase Name={"Médico"} tipoIngreso={3} />
    )
}