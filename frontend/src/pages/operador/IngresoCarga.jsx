import React, {useState} from "react";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {Bubbles, PackageSearch} from "lucide-react";
import {createNumCarga, getLotePreparacion, updateMaterial} from "@/api/trazabilidad.api.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import toast from "react-hot-toast";

export default function IngresoCarga(){
    const [codigoLote, setCodigoLote] = useState("");
    const [loteEncontrado, setLoteEncontrado] = useState(null);
    const [materiales, setMateriales] = useState([]);
    const [data, setData] = useState({});

    // Buscar lote por código
    const buscarLotePorCodigo = async (code) => {
        // trim elimina espacios al inicio y al final
        if (!code.trim()) {
            toast.error("Ingrese un código de lote válido");
            return;
        }

        try {
            const {data} = await getLotePreparacion(code);
            setData(data);

            const lote = Array.isArray(data) && data.length > 0 ? data[0] : data?.materiales ? data : null;

            if (lote) {
                setLoteEncontrado(lote);
                setMateriales(lote.materiales || []);
                console.log("Datos del lote encontrado:", lote);
                toast.success(lote.materiales?.length ? "Código de preparación encontrado" : "El lote no contiene materiales");
            } else {
                setLoteEncontrado(null);
                setMateriales([]);
                toast.error(`No se encontró el lote ${code}`);
            }
        } catch (error) {
            console.error("Error al buscar lote:", error);
            toast.error("Error al buscar el lote: " + (error.response?.data?.detail || error.message));
            setLoteEncontrado(null);
            setMateriales([]);
        }
    };

    const addNumCarga = async () => {
        try {
            // Verificar que haya un lote encontrado
            if (!loteEncontrado) {
                toast.error("No hay un lote válido seleccionado");
                return;
            }

            // Obtener el ID del lote que genera el auto increment, no el código.
            const loteId = loteEncontrado.id || (Array.isArray(data) && data[0]?.id);
            if (!loteId) {
                toast.error("No se pudo obtener el ID del lote");
                return;
            }

            // montar los datos que se esperan
            const cargaData = {
                fechahora: new Date().toISOString(),
                materiales: loteId
            };

            const response = await createNumCarga(cargaData);


            const actualizacionesMateriales = materiales.map(material => {
                // el backend necesita que se envíe todo por separado
                // todo simplificar esto
                return updateMaterial(material.id, {
                    fecha_ingreso: material.fecha_ingreso,
                    nombre: material.nombre,
                    comentarios: material.comentarios || "",
                    cantidad: material.cantidad || 1,
                    estado_id: 3, // El ID 3 corresponde al estado "En Carga" de la tabla EstadoMaterial
                    tipo_id: material.tipo?.id,
                    agregado_por_id: material.agregado_por?.rut,
                    metodo_esterilizacion_id: material.metodo_esterilizacion?.id,
                    tipo_ingreso_id: material.tipo_ingreso?.id,
                    folio_id: material.folio?.id
                });
            });

            await Promise.all(actualizacionesMateriales);
            console.log("Materiales actualizados a estado En Carga");
            toast.success("Carga ingresada correctamente");

            // Limpiar
            setCodigoLote("");
            setLoteEncontrado(null);
            setMateriales([]);
        } catch (error) {
            console.error("Error al ingresar la carga:", error);
            toast.error("Error al ingresar la carga: " + (error.response?.data?.detail || error.message));
        }
    }


    return (
        <div>
            <Main>
                <Title>Ingreso de Carga</Title>

                <div className="flex flex-col md:flex-row gap-4 mb-4 md:justify-between">
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Ingrese cód. de preparación (PREP-0000)"
                            value={codigoLote.toUpperCase()}
                            onChange={e => setCodigoLote(e.target.value)}
                            maxLength={9}
                        />
                        <Button
                            type="submit"
                            onClick={() => buscarLotePorCodigo(codigoLote)}
                        >
                            <PackageSearch /> Buscar
                        </Button>
                    </div>

                    <div className="mt-4 md:mt-0 flex-1 flex items-center justify-center md:justify-end">
                        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-right">
                            Preparación: {loteEncontrado ? loteEncontrado.codigo : "(Ninguno)"}
                        </h1>
                    </div>
                </div>

                <div className="border rounded">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre del material</TableHead>
                                <TableHead>Tipo de material</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Método de esterilización</TableHead>
                                <TableHead>Núm. Folio</TableHead>
                                <TableHead>Observación</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materiales.length > 0 ? (
                                materiales.map((material, index) => (
                                    <TableRow key={material.id || index}>
                                        <TableCell>{material.nombre || "Sin nombre"}</TableCell>
                                        <TableCell>{material.tipo?.tipo_material || "Sin tipo"}</TableCell>
                                        <TableCell>{material.cantidad || 0}</TableCell>
                                        <TableCell>{material.metodo_esterilizacion?.metodo || "No especificado"}</TableCell>
                                        <TableCell>{material.folio?.nfolio || "Sin folio"}</TableCell>
                                        <TableCell>{material.comentarios || "-"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">
                                        No se encontraron materiales para este lote
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-8">
                    <div className="flex flex-col sm:flex-row gap-8 md:gap-12 w-full md:w-auto justify-center">
                        <div className="text-center flex-1">
                            <h2 className="mb-4 whitespace-nowrap">Control Biologico</h2>
                            <div className="scale-150 inline-block">
                                <Switch disabled checked={loteEncontrado?.control_biologico || false}/>
                            </div>
                        </div>
                        <div className="text-center flex-1">
                            <h2 className="mb-4 whitespace-nowrap">Control de Priones</h2>
                            <div className="scale-150 inline-block">
                                <Switch disabled checked={loteEncontrado?.control_priones || false}/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-auto mt-6 md:mt-0 flex justify-center md:justify-end">
                        <Button
                            disabled={!loteEncontrado || materiales.length === 0}
                            className="w-full md:w-auto"
                            onClick={addNumCarga}
                        >
                            <Bubbles /> Ingresar Carga
                        </Button>
                    </div>
                </div>
            </Main>
        </div>
    )
}