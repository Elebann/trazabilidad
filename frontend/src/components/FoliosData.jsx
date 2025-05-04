import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {getFolios} from "@/api/trazabilidad.api.js";

export default function FoliosData() {
    const [folios, setFolios] = useState([]);

    useEffect(() => {
        // async function to load the tasks from the API
        async function loadFolios() {
            // await is used to wait for the API to load the tasks
            const res = await getFolios();
            console.log(res.data);
            // set the tasks to the state 'tasks'
            setFolios(res.data);
        }

        // call the function
        loadFolios();
    }, []);

    return (
        <div>
            <Table className="my-5">
                <TableHeader className="bg-esteril-blue">
                    <TableRow className="hover:bg-transparent ">
                        <TableHead className="text-white">ID</TableHead>
                        <TableHead className="text-white">Nombre Cliente</TableHead>
                        <TableHead className="text-white">Tipo de prestación</TableHead>
                        <TableHead className="text-white">Estado del cliente</TableHead>
                        <TableHead className="text-white">Rut de Usuario</TableHead>
                        <TableHead className="text-white">Nombre Usuario</TableHead>
                        <TableHead className="text-white">Nombre Material</TableHead>
                        <TableHead className="text-white">Tipo de material</TableHead>
                        <TableHead className="text-white">Estado de Material</TableHead>
                        <TableHead className="text-white">Método de esterilización</TableHead>
                        <TableHead className="text-white">Tipo de control</TableHead>
                        <TableHead className="text-white">Fecha ingreso de folio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {folios.length > 0 ?
                        folios.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell className="font-medium">{item.cliente.nombre}</TableCell>
                                <TableCell className="font-medium">{item.cliente.prestacion.prestacion}</TableCell>
                                <TableCell className="font-medium">{item.cliente.estado.estado}</TableCell>
                                <TableCell className="font-medium">{item.usuario.rut}</TableCell>
                                <TableCell className="font-medium">{item.usuario.nombre}</TableCell>
                                <TableCell className="font-medium">{item.material.nombre}</TableCell>
                                <TableCell className="font-medium">{item.material.tipo.tipo_material}</TableCell>
                                <TableCell className="font-medium">{item.material.estado.estado}</TableCell>
                                <TableCell
                                    className="font-medium">{item.material.metodo_esterilizacion.metodo}</TableCell>
                                <TableCell
                                    className="font-medium">{item.material.tipo_control.tipo_control_material}</TableCell>
                                <TableCell className="font-medium">
                                    {new Date(item.fechahora_ingreso).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </TableCell>
                            </TableRow>
                        )) :
                        <TableRow>
                            <TableCell colSpan={12} className="text-center">
                                <p className="my-4 text-lg text-red-500 font-bold">
                                    No hay folios disponibles
                                </p>
                            </TableCell>
                        </TableRow>}
                </TableBody>

            </Table>
        </div>
    )
}
