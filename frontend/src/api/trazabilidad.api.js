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
export const getPrestaciones = () => apiURL.get('prestacion/')
export const getEstadosClientes = () => apiURL.get('estado-cliente/')
export const getRoles = () => apiURL.get('rol/')