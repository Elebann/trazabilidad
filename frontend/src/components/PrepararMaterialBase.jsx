import toast from "react-hot-toast";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import Subtitle from "@/components/Subtitle.jsx";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Checkbox } from "@/components/ui/checkbox";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { getMaterialsByIngreso, createLotePreparacion } from "@/api/trazabilidad.api.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ID de tipos de material
// 1: Externo   2: Pabellón
// 3: Médico   4: Dental

export function PrepararMaterialBase({Name, tipoIngreso, estado = 1}) {
    const [materiales, setMateriales] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [controlBiologico, setControlBiologico] = useState(false);
    const [controlPriones, setControlPriones] = useState(false);
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const { userRut } = useCurrentUser();

    useEffect(() => {
        const cargarMateriales = async () => {
            setLoading(true);
            try {
                const response = await getMaterialsByIngreso(tipoIngreso, estado);
                setMateriales(response.data);
            } catch {
                toast.error("Error al cargar los materiales");
            } finally {
                setLoading(false);
            }
        };
        cargarMateriales();
    }, [tipoIngreso, estado]);

    const seleccionarMaterial = (material) => {
        if (seleccionados.some(m => m.id === material.id)) {
            setSeleccionados(seleccionados.filter(m => m.id !== material.id));
        } else {
            setSeleccionados([...seleccionados, material]);
        }
    };

    const handleImprimir = async () => {
        if (seleccionados.length === 0) {
            toast.error("Debe seleccionar al menos un material");
            return;
        }

        if (!userRut) {
            toast.error("Debe iniciar sesión para realizar esta acción");
            return;
        }

        setEnviando(true);
        try {
            // Crear lote de preparación
            const data = {
                materiales_ids: seleccionados.map(material => material.id),
                control_biologico: controlBiologico,
                control_priones: controlPriones,
                preparado_por_id: userRut
            };

            console.log("Enviando datos:", data);

            // Usar toast.promise para mejor feedback
            const response = await toast.promise(
                createLotePreparacion(data),
                {
                    loading: 'Preparando materiales...',
                    success: (res) => `Lote creado: ${res.data.codigo}`,
                    error: (err) => {
                        console.error("Error detallado:", err);
                        return `Error: ${err.response?.data?.error || err.message || 'Inténtelo nuevamente'}`;
                    },
                }
            );

            // Actualizar la lista de materiales (eliminar los ya preparados)
            setMateriales(materiales.filter(m => !seleccionados.some(s => s.id === m.id)));
            setSeleccionados([]);

        } catch (error) {
            console.error("Error al crear lote:", error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div>
            <Main>
                <Title>Preparación de material {Name}</Title>
                {loading
                    ? (<p>Cargando materiales...</p>)
                    : (
                        <div className="rounded-md border mb-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Seleccionar</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Cantidad</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Núm. Folio</TableHead>
                                        <TableHead>Observación</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {materiales.length > 0
                                    ? (
                                        materiales.map((material) => (
                                            <TableRow key={material.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={seleccionados.some(m => m.id === material.id)}
                                                        onCheckedChange={() => seleccionarMaterial(material)}
                                                    />
                                                </TableCell>
                                                <TableCell>{material.nombre}</TableCell>
                                                <TableCell>{material.cantidad}</TableCell>
                                                <TableCell>{material.folio?.cliente?.nombre || "Sin cliente"}</TableCell>
                                                <TableCell>{material.folio?.nfolio || "N/A"}</TableCell>
                                                <TableCell>{material.comentarios || "-"}</TableCell>
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

                <Subtitle className="mt-4">Seleccionados ({seleccionados.length})</Subtitle>
                <div className="rounded-md border mb-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Observación</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {seleccionados.length > 0 ? (
                                seleccionados.map((material) => (
                                    <TableRow key={material.id}>
                                        <TableCell>{material.nombre}</TableCell>
                                        <TableCell>{material.cantidad}</TableCell>
                                        <TableCell>{material.folio?.cliente?.nombre || "Sin cliente"}</TableCell>
                                        <TableCell>{material.comentarios || "-"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No hay materiales
                                        seleccionados</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem"}}>
                    <div style={{display: "flex", gap: "3rem"}}>
                        <div style={{textAlign: "center"}}>
                            <h2 style={{marginBottom: "1rem"}}>Control Biologico</h2>
                            <div style={{transform: "scale(1.5)"}}>
                                <Switch
                                    checked={controlBiologico}
                                    onCheckedChange={setControlBiologico}
                                />
                            </div>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <h2 style={{marginBottom: "1rem"}}>Control de Priones</h2>
                            <div style={{transform: "scale(1.5)"}}>
                                <Switch
                                    checked={controlPriones}
                                    onCheckedChange={setControlPriones}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{transform: "scale(1.5)", marginRight: "2rem"}}>
                        <Button
                            // variant="destructive"
                            onClick={handleImprimir}
                            disabled={seleccionados.length === 0 || enviando}
                        >
                            {enviando ? "Procesando..." : "Imprimir"}
                        </Button>
                    </div>
                </div>
            </Main>
        </div>
    );
}