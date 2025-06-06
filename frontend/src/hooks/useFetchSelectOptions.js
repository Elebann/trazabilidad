import { useEffect, useState } from "react";
import {
    getClientes, getMaterials,
    getMetodosEsterilizacion,
    getServicios, getRoles,
    getTiposMateriales,
    getUsers,
    getEstadosMateriales,
    getTiposControlesMaterial,
    getTiposIngreso
} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";

export function useFetchSelectOptions() {
    const [clientes, setClientes] = useState([]);
    const [metEsterilizacion, setMetEsterilizacion] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [tiposMateriales, setTiposMateriales] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [roles, setRoles] = useState([]);
    const [estadosMaterial, setEstadosMaterial] = useState([]);
    const [tiposControl, setTiposControl] = useState([]);
    const [tiposIngreso, setTiposIngreso] = useState([]);

    useEffect(() => {
        async function fetchAll() {
            try {
                const [
                    { data: clientesData }, // obtener todos los clientes
                    { data: metData }, // obtener todos los métodos de esterilización
                    { data: usuariosData }, // obtener todos los usuarios
                    { data: serviciosData }, // obtener todas las prestaciones
                    { data: tiposMaterialesData }, // obtener todos los tipos de materiales
                    { data: materialesData }, // obtener todos los materiales
                    { data: rolesData }, // obtener todos los roles
                    { data: estadosMaterialData }, // obtener todos los estados de material
                    { data: tiposControlData }, // obtener todos los tipos de control
                    { data: tiposIngresoData } // obtener todos los tipos de ingreso
                ] = await Promise.all([
                    getClientes(),
                    getMetodosEsterilizacion(),
                    getUsers(),
                    getServicios(),
                    getTiposMateriales(),
                    getMaterials(),
                    getRoles(),
                    getEstadosMateriales(),
                    getTiposControlesMaterial(),
                    getTiposIngreso()
                ]);
                setClientes(clientesData);
                setMetEsterilizacion(metData);
                setUsuarios(usuariosData);
                setServicios(serviciosData);
                setTiposMateriales(tiposMaterialesData);
                setMateriales(materialesData);
                setRoles(rolesData);
                setEstadosMaterial(estadosMaterialData);
                setTiposControl(tiposControlData);
                setTiposIngreso(tiposIngresoData);
            } catch (error) {
                console.error("Error al cargar opciones del formulario:", error);
                toast.error("Error al cargar opciones del formulario.");
            }
        }
        fetchAll();
    }, []);

    return { 
        clientes, 
        metEsterilizacion, 
        usuarios, 
        servicios, 
        tiposMateriales, 
        materiales, 
        roles, 
        estadosMaterial,
        tiposControl,
        tiposIngreso
    };
}
