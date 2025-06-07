import {useState, useEffect} from "react";
import toast from "react-hot-toast";

export function useCurrentUser() {
    const [userData, setUserData] = useState(null);
    const [userRut, setUserRut] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRolID, setUserRolID] = useState(null);
    const [userRol, setUserRol] = useState(null);

    useEffect(() => {
        try {
            const loggedUser = JSON.parse(localStorage.getItem("user_data"));
            if (loggedUser) {
                // console.log("Sesión encontrada: ", loggedUser);
                setUserData(loggedUser);
                if (loggedUser.rut) setUserRut(loggedUser.rut.toString());
                if (loggedUser.nombre) setUserName(loggedUser.nombre);
                if (loggedUser.rol_id) setUserRolID(loggedUser.rol_id);
                if (loggedUser.rol) setUserRol(loggedUser.rol);
            }
        } catch (error) {
            console.error("Error al obtener datos de usuario:", error);
            toast.error("Error al cargar los datos de la sesión");
        }
    }, []);

    return {
        userData,       // objeto completo del usuario
        userRut,        // solo el RUT como string
        userName,       // nombre del usuario
        userRolID,      // ID del rol del usuario
        userRol,        // nombre del rol del usuario
        isLoggedIn: !!userData // booleano que indica si hay un usuario logueado
    };
}