import React from 'react';
import Main from "@/components/Main.jsx";
import FoliosData from "@/components/FoliosData.jsx";
import Title from "@/components/Title.jsx";

function Folios() {
    return (
        <div>
            <Main>
                <Title>Folios</Title>
                <p>Página para mostrar los folios de los productos</p>
                <FoliosData />
            </Main>
        </div>
    );
}

export default Folios;