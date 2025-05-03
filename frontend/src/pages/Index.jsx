import React from 'react';
import {Sidebar} from "@/components/ui/sidebar.jsx";

function Index() {
    return (
        <div className="flex">
            <main>
                <h1 className={"text-4xl font-bold"}>Página de Inicio</h1>
                <p>Página principal</p>
                <p>La única razón de esta página es probar la persistencia del sidebar</p>
            </main>
        </div>
    );
}

export default Index;
