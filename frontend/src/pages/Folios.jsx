import React, {useEffect, useState} from 'react';
import Main from "@/components/Main.jsx";
import FoliosData from "@/components/FoliosData.jsx";
import Title from "@/components/Title.jsx";
import {DataTable} from "@/components/DataTable.jsx";
import {getFolios} from "@/api/trazabilidad.api.js";
import {folioColumns} from "@/features/columns.jsx";

function Folios() {
    const [folios, setFolios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // async function to load the tasks from the API
        async function loadFolios() {
            try{
                const { data } = await getFolios();
                setFolios(data);
            }
            catch (error) {
                console.error("Error al cargar folios:", error);
            } finally {
                setIsLoading(false);
            }
        }

        // call the function
        loadFolios();
    }, []);

    return (
        <div>
            <Main>
                <Title>Folios</Title>
                { isLoading ? (
                    <p>Cargando folios...</p>
                ) : (
                    <DataTable data={folios} columns={folioColumns} />
                )}

            </Main>
        </div>
    );
}

export default Folios;