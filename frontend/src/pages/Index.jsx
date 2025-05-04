import React from 'react';
import {Sidebar} from "@/components/ui/sidebar.jsx";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";

function Index() {
    return (
        <div className="flex">
            <Main>
                <Title>Inicio</Title>
                <p>Página principal</p>
                <p>La única razón de esta página es probar la persistencia del sidebar</p>
            </Main>
        </div>
    );
}

export default Index;
