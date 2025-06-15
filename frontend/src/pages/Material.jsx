import React, {useEffect, useState} from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {getMaterials} from "@/api/trazabilidad.api.js";
import {DataTable} from "@/components/DataTable.jsx";
import {materialsColumns} from "@/features/columns.jsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.jsx";

function Material() {

    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // load materials
    useEffect(() => {
        async function loadMaterials() {
            try{
                const { data } = await getMaterials();
                setMaterials(data);
            }
            catch (error) {
                console.error("Error al cargar los materiales:", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        loadMaterials();
    }, []);

    return (

        <Main>
            <Title>Materiales</Title>
            { isLoading ? (
                <p>Cargando materiales...</p>
            ) : (
                <ScrollArea className="w-full" scrollHide={false} type="always" scrollbarVisibility="auto">

                    <DataTable data={materials} columns={materialsColumns} />

                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            )}
        </Main>

    );
}

export default Material;