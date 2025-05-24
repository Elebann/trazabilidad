import React, { useEffect, useState } from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import { DataTable } from "@/components/DataTable.jsx";
import { getUsers } from "@/api/trazabilidad.api.js";
import { userColumns } from "@/features/columns.jsx";
import {Button} from "@/components/ui/button.jsx";
import { UserPlus } from "lucide-react";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            try {
                const { data } = await getUsers();
                setUsers(data);
                console.log("Usuarios cargados:", data);
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
                <Title>Gestión de Usuarios</Title>

                <Button className="bg-esteril-blue text-white hover:bg-esteril-blue-light">
                    <UserPlus /> Agregar nuevo Usuario
                </Button>

                {isLoading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <div className="mt-5">
                        <DataTable columns={userColumns} data={users} />
                    </div>
                )}
            </Main>
        </div>
    );
}

export default Users;