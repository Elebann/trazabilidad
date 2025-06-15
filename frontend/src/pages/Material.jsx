import React, {useEffect, useState} from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {getMaterials} from "@/api/trazabilidad.api.js";
import {DataTable} from "@/components/DataTable.jsx";
import {materialsColumns} from "@/features/columns.jsx";
import {Description} from "@/components/Description.jsx";

function Material() {
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // load materials
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getMaterials();
                setMaterials(data);
            } catch (error) {
                console.error("Error al cargar los materiales:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <Main>
            <Title>Materiales</Title>
            <Description>Puede hacer scroll horizontal si el contenido no cabe completamente hacia los lados.</Description>

            { isLoading
                ? ( <p>Cargando materiales...</p>)
                : ( <DataTable
                        data={materials}
                        columns={materialsColumns}
                    />
                )
            }
        </Main>
    );
}

export default Material;