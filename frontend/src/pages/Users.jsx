import React from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";

function Users() {
    return (
        <div className="flex">
            <Main>
                <Title>Usuarios</Title>
                <p>Página para mostrar los usuarios</p>
                <p>La única razón de esta página es probar la persistencia del sidebar</p>
            </Main>
        </div>
    );
}

export default Users;