import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom"
import Index from "@/pages/Index.jsx"
import Login from "@/pages/Login.jsx"
import Users from "@/pages/Users.jsx"
import Folios from "@/pages/Folios.jsx"
import Material from "@/pages/Material.jsx"
import Clientes from "@/pages/Clientes.jsx"
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import IngresoMaterialExterno from "@/pages/instrumentista/IngresoMaterialExterno.jsx";
import PreparacionMaterialExterno from "@/pages/instrumentista/PreparacionMaterialExterno.jsx";
import ModificacionMaterialPabellon from "@/pages/coordinador/ModificacionMaterialPabellon.jsx";
import ModificacionMaterialDental from "@/pages/coordinador/ModificacionMaterialDental.jsx";
import ModificacionMaterialExterno from "@/pages/coordinador/ModificacionMaterialExterno.jsx";
import ModificacionMaterialMedico from "@/pages/coordinador/ModificacionMateriaMedico.jsx";
import IngresoCarga from "@/pages/operador/IngresoCarga.jsx";
import Cargas from "@/pages/operador/Cargas.jsx";
import {Toaster} from 'react-hot-toast';
import {NuevoUsuario} from "@/pages/enfermera/NuevoUsuario.jsx";
import IngresoMaterialPabellon from "@/pages/instrumentista/IngresoMaterialPabellon.jsx";
import {EditarUsuario} from "@/pages/enfermera/EditarUsuario.jsx";
import IngresoMaterialMedico from "@/pages/instrumentista/IngresoMaterialMedico.jsx";
import IngresoMaterialDental from "@/pages/instrumentista/IngresoMaterialDental.jsx";
import PreparacionMaterialMedico from "@/pages/instrumentista/PreparacionMaterialMedico.jsx";
import PreparacionMaterialPabellon from "@/pages/instrumentista/PreparacionMaterialPabellon.jsx";
import PreparacionMaterialDental from "@/pages/instrumentista/PreparacionMaterialDental.jsx";
import ModificacionMaterial from "@/pages/coordinador/ModificacionMaterial.jsx";
import {GestionClientes} from "@/pages/enfermera/GestionClientes.jsx";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import toast from "react-hot-toast";


const routeRoles = {
    "/": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/index": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/clientes": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/material": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/folios": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/usuarios": ["Administrador"],
    "/nuevo-usuario": ["Administrador"],
    "/editar-usuario/:rut": ["Administrador"],
    "/gestion-clientes/": ["Administrador"],
    "/gestion-clientes": ["Administrador"],
    "/ingreso-externo": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/preparacion-material-externo": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/ingreso-pabellon": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/ingreso-medico": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/ingreso-dental": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/preparacion-material-pabellon": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/preparacion-material-medico": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/preparacion-material-dental": ["Instrumentista", "Coordinador", "Operador", "Administrador"],
    "/modificacion-material-pabellon": ["Coordinador", "Operador", "Administrador"],
    "/modificacion-material-externo": ["Coordinador", "Operador", "Administrador"],
    "/modificacion-material-dental": ["Coordinador", "Operador", "Administrador"],
    "/modificacion-material-medico": ["Coordinador", "Operador", "Administrador"],
    "/ModificacionMaterial/:id": ["Coordinador", "Operador", "Administrador"],
    "/ingreso-carga": ["Operador", "Administrador"],
    "/cargas": ["Operador", "Administrador"],
};

function matchRoute(pathname, userRol) {
    // Normalizado de rutas con parámetros dinámicos
    if (pathname.startsWith("/editar-usuario/")) return routeRoles["/editar-usuario/:rut"]?.includes(userRol);
    if (pathname.startsWith("/ModificacionMaterial/")) return routeRoles["/ModificacionMaterial/:id"]?.includes(userRol);
    // "/" también está protegido
    if (pathname === "/") return routeRoles["/"]?.includes(userRol);
    return routeRoles[pathname]?.includes(userRol);
}

function ProtectedRoute({children}) {
    const { isLoggedIn, userRol, loadingUser } = useCurrentUser();
    const location = useLocation();

    // Esperar a que el hook determine el estado real del usuario
    if (loadingUser) {
        return null;
    }

    if (!isLoggedIn) {
        if (location.pathname !== "/login") {
            toast.error("Debe iniciar sesión.");
        }
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    // Permitir acceso a /index siempre que esté logueado
    if (location.pathname === "/index") return children;
    // Verificar permisos de ruta
    if (!matchRoute(location.pathname, userRol)) {
        toast.error("No tiene permisos para acceder a esta página.");
        return <Navigate to="/index" replace />;
    }
    return children;
}

function App() {
    // Forzar refresco global tras login/logout
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "user_data" || e.key === "access_token" || e.key === "refresh_token") {
                window.dispatchEvent(new Event("userSessionChanged"));
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <>
            {/* This is used to display toast notifications */}
            <Toaster />

            <BrowserRouter>
                <Routes>
                    {/* excluir el Login de estar protegido */}
                    <Route path="/login" element={<Login/>}/>
                    {/* Todas las demás rutas protegidas */}
                    <Route element={
                        <ProtectedRoute>
                            <SidebarLayout/>
                        </ProtectedRoute>
                    }>
                        {/* Default views todo: adjust some items from here */}
                        <Route path="/" element={<Navigate to={"/index"}/>}/>
                        <Route path="/index" element={<Index/>}/>
                        <Route path="/clientes" element={<Clientes/>}/>
                        <Route path="/material" element={<Material/>}/>
                        <Route path="/folios" element={<Folios/>}/>
                        {/* administrative/Enfermera views: todo hide this to non-permission users when roles has been implemented */}
                        <Route path="/usuarios" element={<Users/>}/>
                        <Route path="/nuevo-usuario" element={<NuevoUsuario/>}/>
                        <Route path="/editar-usuario/:rut" element={<EditarUsuario/>}/>
                        <Route path="gestion-clientes/" element={<GestionClientes />} />
                        {/* Instrumentista routes */}
                        <Route path="/ingreso-externo" element={<IngresoMaterialExterno/>}/>
                        <Route path="/ingreso-pabellon" element={<IngresoMaterialPabellon/>}/>
                        <Route path="/ingreso-medico" element={<IngresoMaterialMedico/>}/>
                        <Route path="/ingreso-dental" element={<IngresoMaterialDental/>}/>
                        <Route path="/preparacion-material-externo" element={<PreparacionMaterialExterno/>}/>
                        <Route path="/preparacion-material-pabellon" element={<PreparacionMaterialPabellon/>}/>
                        <Route path="/preparacion-material-medico" element={<PreparacionMaterialMedico/>}/>
                        <Route path="/preparacion-material-dental" element={<PreparacionMaterialDental/>}/>
                        {/* Coordinador routes */}
                        <Route path="/modificacion-material-pabellon" element={<ModificacionMaterialPabellon/>}/>
                        <Route path="/modificacion-material-externo" element={<ModificacionMaterialExterno/>}/>
                        <Route path="/modificacion-material-dental" element={<ModificacionMaterialDental/>}/>
                        <Route path="/modificacion-material-medico" element={<ModificacionMaterialMedico/>}/>
                        <Route path="/ModificacionMaterial/:id" element={<ModificacionMaterial/>}/>
                        {/* Operador routes */}
                        <Route path="/ingreso-carga" element={<IngresoCarga/>}/>
                        <Route path="/cargas" element={<Cargas/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App