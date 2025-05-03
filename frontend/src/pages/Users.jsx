import React from 'react';
import Main from "@/components/Main.jsx";

function Users() {
    return (
        <div className="flex">
            <Main>
                <h1 className={"text-4xl font-bold"}>Página de Usuarios</h1>
                <p>Página para mostrar los usuarios</p>
                <p>La única razón de esta página es probar la persistencia del sidebar</p>
            </Main>
        </div>
    );
}

export default Users;