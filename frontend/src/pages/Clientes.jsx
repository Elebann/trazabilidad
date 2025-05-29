import React, {useEffect, useState} from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {DataTable} from "@/components/DataTable.jsx";
import {clientesColumns} from "@/features/columns.jsx";
import {getClientes} from "@/api/trazabilidad.api.js";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadClientes() {
            try{
                const { data } = await getClientes();
                setClientes(data);
            }
            catch (error) {
                console.error("Error al cargar los clientes:", error);
            } finally {
                setIsLoading(false);
            }
        }

        // call the function
        loadClientes();
    }, []);

    return (
        <div>
            <Main>
                <Title>Clientes</Title>

                { isLoading ? (
                    <p>Cargando clientes...</p>
                ) : (
                    <DataTable data={clientes} columns={clientesColumns} />
                )}
            </Main>
        </div>
    );
}

export default Clientes;