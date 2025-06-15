import React, { useEffect, useState } from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import { DataTable } from "@/components/DataTable.jsx";
import {deleteUser, getUsers} from "@/api/trazabilidad.api.js";
import { userColumns } from "@/features/columns.jsx";
import {Button} from "@/components/ui/button.jsx";
import { UserPlus } from "lucide-react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {Description} from "@/components/Description.jsx";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleDelete = async (rut) => {
        try {
            await deleteUser(rut);
            setUsers((prevUsers) => prevUsers.filter(user => user.rut !== rut));
            toast.success(`Usuario eliminado.`);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            toast.error("Error al eliminar el usuario.");
        }
    };

    const columns = userColumns({ handleDelete });

    return (
        <div>
            <Main>
                <Title>Gestión de Usuarios</Title>
                <Description>Crear, modificar o eliminar usuarios fácilmente.</Description>

                <Button onClick={() => navigate('/nuevo-usuario')} className="bg-esteril-blue text-white hover:bg-esteril-blue-light">
                    <UserPlus /> Agregar nuevo Usuario
                </Button>

                {isLoading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <div className="mt-5">
                        <DataTable columns={columns} data={users} />
                    </div>
                )}
            </Main>
        </div>
    );
}

export default Users;