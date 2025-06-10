import axios from 'axios';

const apiURL = axios.create({
    baseURL: 'http://localhost:8000/app/api/v1/'
})

// Folios
export const getFolios = () => apiURL.get('folio/')
export const getFolio = (id) => apiURL.get(`folio/${id}/`)
export const createFolio = (folio) => apiURL.post('folio/', folio)
export const deleteFolio = (id) => apiURL.delete(`folio/${id}/`)

// Materiales
export const getMaterials = () => apiURL.get('material/')
export const getMaterial = (id) => apiURL.get(`material/${id}/`)
export const createMaterial = (material) => apiURL.post('material/', material)
// obtener los materiales de tipo específico y estado específico, se usa para la preparacion de material
export const getMaterialsByIngreso = (tipoIngresoId, estadoId) =>
    apiURL.get(`material/?tipo_ingreso=${tipoIngresoId}${estadoId ? `&estado=${estadoId}` : ''}`);
// crear un lote de preparación
export const createLotePreparacion = (data) => {
    console.log("URL completa:", apiURL.defaults.baseURL + 'lote-preparacion/crear-lote-preparacion/');
    console.log("Datos a enviar:", data);
    return apiURL.post('lote-preparacion/crear-lote-preparacion/', data);
};

// Función para crear folio con materiales en secuencia
export const createFolioWithMaterials = async (folioData, materialsData) => {
    try {
        // Adaptar el formato del folio para que coincida con el esperado por el backend
        const folioToSend = {
            cliente_id: folioData.cliente,
            ingresado_id: folioData.ingresado,
            recepcionado_id: folioData.recepcionado,
            servicio_id: folioData.servicio,
            nfolio: folioData.nfolio,
            fechahora_ingreso: folioData.fechahora_ingreso
        };

        // Primero creamos el folio
        const folioResponse = await createFolio(folioToSend);
        const folioId = folioResponse.data.id;

        // Adaptar el formato de cada material para que coincida con el esperado por el backend
        const materialsToSend = materialsData.map(material => ({
            fecha_ingreso: material.fecha_ingreso,
            nombre: material.nombre,
            comentarios: material.comentarios || "",
            cantidad: material.cantidad,
            estado_id: material.estado,
            tipo_id: material.tipo,
            agregado_por_id: material.agregado_por,
            metodo_esterilizacion_id: material.metodo_esterilizacion,
            // tipo_control_id: material.tipo_control,
            tipo_ingreso_id: material.tipo_ingreso,
            folio_id: folioId
        }));
        
        // Luego creamos cada material asociado a ese folio
        const materialsPromises = materialsToSend.map(material => 
            createMaterial(material)
        );
        
        const materialsResponses = await Promise.all(materialsPromises);
        return {
            folio: folioResponse.data,
            materials: materialsResponses.map(res => res.data)
        };
    } catch (error) {
        console.error("Error creating folio with materials:", error);
        throw error;
    }
}

// Usuarios
export const createUser = (user) => apiURL.post('usuario/', user)
export const getUsers = () => apiURL.get('usuario/')
export const getUser = (id) => apiURL.get(`usuario/${id}/`)
export const updateUser = (id, user) => apiURL.put(`usuario/${id}/`, user)
export const deleteUser = (id) => apiURL.delete(`usuario/${id}/`)
// todo make an endpoint to invalidate a refresh token from a user

// Login
export const userLogin = (credentials) => apiURL.post('token/', credentials)

// Clientes
export const getClientes = () => apiURL.get('cliente/')

// get some select options for the frontend. with this we can avoid hardcoding the options in the frontend
// todo explain why and where we are using this
export const getTiposMateriales = () => apiURL.get('tipo-material/')
export const getEstadosMateriales = () => apiURL.get('estado-material/')
export const getMetodosEsterilizacion = () => apiURL.get('metodo-esterilizacion/')
export const getTiposControlesMaterial = () => apiURL.get('tipo-control-material/')
export const getServicios = () => apiURL.get('servicio/')
export const getEstadosClientes = () => apiURL.get('estado-cliente/')
export const getRoles = () => apiURL.get('rol/')
export const getTiposIngreso = () => apiURL.get('tipo-ingreso/')