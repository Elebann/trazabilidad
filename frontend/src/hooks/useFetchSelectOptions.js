import { useEffect, useState } from "react";
import {
    getClientes, getMaterials,
    getMetodosEsterilizacion,
    getServicios, getRoles,
    getTiposMateriales,
    getUsers
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
                    { data: rolesData } // obtener todos los roles
                ] = await Promise.all([
                    getClientes(),
                    getMetodosEsterilizacion(),
                    getUsers(),
                    getServicios(),
                    getTiposMateriales(),
                    getMaterials(),
                    getRoles()
                ]);
                setClientes(clientesData);
                setMetEsterilizacion(metData);
                setUsuarios(usuariosData);
                setServicios(serviciosData);
                setTiposMateriales(tiposMaterialesData);
                setMateriales(materialesData);
                setRoles(rolesData);
            } catch (error) {
                console.error("Error al cargar opciones del formulario:", error);
                toast.error("Error al cargar opciones del formulario.");
            }
        }
        fetchAll();
    }, []);

    return { clientes, metEsterilizacion, usuarios, servicios, tiposMateriales, materiales, roles };
}