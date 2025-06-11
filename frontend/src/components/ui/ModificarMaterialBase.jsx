import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {getMaterialsByIngreso} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Pencil} from "lucide-react";

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
                    <input
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
                <div className="rounded-md border mb-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre Material</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>N°Folio</TableHead>
                                <TableHead>Observación</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materialesFiltrados.length > 0
                                    ? (
                                        materialesFiltrados.map((material) => (
                                            <TableRow key={material.id}>
                                                <TableCell>{material.nombre}</TableCell>
                                                <TableCell>{material.cantidad}</TableCell>
                                                <TableCell>{material.folio?.cliente?.nombre || "Sin cliente"}</TableCell>
                                                <TableCell>{material.folio?.nfolio || "N/A"}</TableCell>
                                                <TableCell>{material.comentarios || "-"}</TableCell>
                                                <TableCell>
                                                    <EditMaterialButton id={material.id} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                    : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">No hay materiales disponibles</TableCell>
                                        </TableRow>
                                    )}
                        </TableBody>
                    </Table>
                </div>
                    )}
            </Main>
        </div>
    );
}