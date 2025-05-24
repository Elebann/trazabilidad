import axios from 'axios';

const apiURL = axios.create({
    baseURL: 'http://localhost:8000/app/api/v1/'
})

// Folios
export const getFolios = () => apiURL.get('folio/')
export const getFolio = (id) => apiURL.get(`folio/${id}/`)
export const createFolio = (folio) => apiURL.post('folio/', folio)
export const deleteFolio = (id) => apiURL.delete(`folio/${id}/`)

// Usuarios
export const getUsers = () => apiURL.get('usuario/')
// todo make an endpoint to invalidate a refresh token from a user

// Login
export const userLogin = (credentials) => apiURL.post('token/', credentials)