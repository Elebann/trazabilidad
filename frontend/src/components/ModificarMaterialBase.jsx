import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {getMaterialsByIngreso} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";
import {PackagePlus, Pencil} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {modificarMaterialBase} from "@/features/columns.jsx";
import {DataTable} from "@/components/DataTable.jsx";
import {Description} from "@/components/Description.jsx";

export default function ModificarMaterialBase({Name, tipoIngreso, estado = 1}) {
    const [loading, setLoading] = useState(true);
    const [materiales, setMateriales] = useState([]);
    const [filtroFolio, setFiltroFolio] = useState("");

    useEffect(() => {
        console.log("Valor de tipoIngreso:", tipoIngreso);
        if (typeof tipoIngreso === "undefined" || tipoIngreso === null) {
            setMateriales([]);
            setLoading(false);
            return;
        }
        const cargarMateriales = async () => {
            setLoading(true);
            try {
                const response = await getMaterialsByIngreso(tipoIngreso, estado);
                console.log("Materiales recibidos:", response.data);
                setMateriales(response.data);
            } catch {
                toast.error("Error al cargar los materiales");
            } finally {
                setLoading(false);
            }
        };
        cargarMateriales();
    }, [tipoIngreso, estado]);

    // Filtrar materiales por número de folio
    const materialesFiltrados = materiales.filter(material =>
        filtroFolio === "" ||
        (material.folio?.nfolio && material.folio.nfolio.toString().includes(filtroFolio))
    );

    return (
        <div>
            <Main>
                <Title>Modificación del Material {Name}</Title>
                    <Description className="flex items-center">
                        Solo se pueden modificar los materiales con el estado
                        <span className="text-yellow-600 inline-flex items-center gap-2 mx-1 my-auto">
                            <PackagePlus /> Recepcionado
                        </span>
                    </Description>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Buscar por N° Folio"
                        value={filtroFolio}
                        onChange={e => setFiltroFolio(e.target.value)}
                        style={{ padding: "0.5rem", width: "200px" }}
                    />
                </div>
                {loading
                    ? (<p>Cargando materiales...</p>)
                    : (
                <div className="mb-4">
                    <DataTable
                        columns={modificarMaterialBase}
                        data={materialesFiltrados}
                        noDataText="No hay materiales disponibles"
                    />

                </div>
                    )}
            </Main>
        </div>
    );
}