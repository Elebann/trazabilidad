import {useState, useEffect} from "react";
import toast from "react-hot-toast";

export function useCurrentUser() {
    const [userData, setUserData] = useState(null);
    const [userRut, setUserRut] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRolID, setUserRolID] = useState(null);
    const [userRol, setUserRol] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        function syncUser() {
            try {
                const loggedUser = JSON.parse(localStorage.getItem("user_data"));
                if (loggedUser) {
                    setUserData(loggedUser);
                    if (loggedUser.rut) setUserRut(loggedUser.rut.toString());
                    if (loggedUser.nombre) setUserName(loggedUser.nombre);
                    if (loggedUser.rol_id) setUserRolID(loggedUser.rol_id);
                    if (loggedUser.rol) setUserRol(loggedUser.rol);
                } else {
                    setUserData(null);
                    setUserRut(null);
                    setUserName(null);
                    setUserRolID(null);
                    setUserRol(null);
                }
            } catch (error) {
                console.error("Error al obtener datos de usuario:", error);
                toast.error("Error al cargar los datos de la sesión");
            } finally {
                setLoadingUser(false);
            }
        }
        setLoadingUser(true);
        syncUser();
        window.addEventListener('storage', syncUser);
        window.addEventListener('userSessionChanged', syncUser);
        return () => {
            window.removeEventListener('storage', syncUser);
            window.removeEventListener('userSessionChanged', syncUser);
        };
    }, []);

    return {
        userData,
        userRut,
        userName,
        userRolID,
        userRol,
        isLoggedIn: !!userData,
        loadingUser
    };
}
