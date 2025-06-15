import React, {useEffect, useState} from 'react';
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {DataTable} from "@/components/DataTable.jsx";
import {ExpandableDataTable} from "@/components/ExpandedDataTable.jsx";
import {getFolios, getMaterialByFolio} from "@/api/trazabilidad.api.js";
import {folioColumns, materialsColumns} from "@/features/columns.jsx";
import Subtitle from "@/components/Subtitle.jsx";
import {Description} from "@/components/Description.jsx";

// Folio Details go to search data from Material, since we're not saving Material in Folio, so we have to fetch it this way
const FolioDetail = ({ nFolio }) => {
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const { data } = await getMaterialByFolio(nFolio);
                setMaterials(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener los materiales del folio:", error);
                setIsLoading(false);
            }
        }

        fetchMaterials();
    }, [nFolio]);

    if (isLoading) return <p>Cargando materiales...</p>;

    return (
        <div className="p-4">
            <Subtitle>Materiales del Folio</Subtitle>

            <div className={"rounded-md mt-2"}>
                <DataTable
                    data={materials}
                    columns={materialsColumns}
                />
            </div>
        </div>
    );
};


function Folios() {
    const [folios, setFolios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // async function to load the tasks from the API
        async function loadFolios() {
            try{
                const { data } = await getFolios();
                // order the data by nfolio
                data.sort((a, b) => a.nfolio - b.nfolio);
                setFolios(data);
                console.log("Folios cargados:", data);
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
                <Description>Para ver los materiales asociados al folio, haga clic en Detalles</Description>

                { isLoading ? (
                    <p>Cargando folios...</p>
                ) : (
                    <>
                        {/*<DataTable data={folios} columns={folioColumns} />*/}
                        <ExpandableDataTable
                            columns={folioColumns}
                            data={folios}
                            renderExpandedRow={(rowData) => <FolioDetail nFolio={rowData.id} />}
                        />
                    </>
                )}
            </Main>
        </div>
    );
}

export default Folios;