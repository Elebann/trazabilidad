import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {getMaterialsByIngreso} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Pencil} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {modificarMaterialBase} from "@/features/columns.jsx";
import {DataTable} from "@/components/DataTable.jsx";

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

    function EditMaterialButton({ id }) {
        const navigate = useNavigate();
        return (
            <Button
                variant="outline"
                onClick={() => navigate(`/ModificacionMaterial/${id}`)}
                className="hover:bg-esteril-blue-light hover:text-white"
            >
                <Pencil className="h-4 w-4" /> Modificar
            </Button>
        );
    }


    return (
        <div>
            <Main>
                <Title>Modificación del Material {Name}</Title>
                <div style={{ marginBottom: "1rem" }}>
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