import React from 'react';
import {Sidebar} from "@/components/ui/sidebar.jsx";
import Main from "@/components/Main.jsx";

function Index() {
    return (
        <div className="flex">
            <Main>
                <h1 className={"text-4xl font-bold"}>Página de Inicio</h1>
                <p>Página principal</p>
                <p>La única razón de esta página es probar la persistencia del sidebar</p>
            </Main>
        </div>
    );
}

export default Index;
