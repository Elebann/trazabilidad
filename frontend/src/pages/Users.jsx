import React, { useEffect, useState } from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import { DataTable } from "@/components/DataTable.jsx";
import { getUsers } from "@/api/trazabilidad.api.js";
import { userColumns } from "@/features/columns.jsx";
import {Button} from "@/components/ui/button.jsx";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            try {
                const { data } = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, []);

    return (
        <div className="flex">
            <Main>
                <Title>Usuarios</Title>

                <Button variant="outline">Agregar Usuario</Button>
                <Button variant="outline">Modificar Usuario</Button>
                <Button variant="outline">Elminar Usuario</Button>

                {isLoading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <DataTable columns={userColumns} data={users} />
                )}
            </Main>
        </div>
    );
}

export default Users;