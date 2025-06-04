import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Index from "@/pages/Index.jsx"
import Login from "@/pages/Login.jsx"
import Users from "@/pages/Users.jsx"
import Folios from "@/pages/Folios.jsx"
import Material from "@/pages/Material.jsx"
import Clientes from "@/pages/Clientes.jsx"
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import GestionTiempo from '@/pages/GestionTiempo.jsx';
import IngresoMaterialExterno from "@/pages/instrumentista/IngresoMaterialExterno.jsx";
import PreparacionMaterialExterno from "@/pages/instrumentista/PreparacionMaterialExterno.jsx";
import ModificacionMaterial from "@/pages/coordinador/ModificacionMaterial.jsx";
import IngresoCarga from "@/pages/operador/IngresoCarga.jsx";
import { Toaster } from 'react-hot-toast';
import {NuevoUsuario} from "@/pages/enfermera/NuevoUsuario.jsx";
import IngresoMaterialPabellon from "@/pages/instrumentista/IngresoMaterialPabellon.jsx";
import {EditarUsuario} from "@/pages/enfermera/EditarUsuario.jsx";
import IngresoMaterialMedico from "@/pages/instrumentista/IngresoMaterialMedico.jsx";
import IngresoMaterialDental from "@/pages/instrumentista/IngresoMaterialDental.jsx";
import PreparacionMaterialMedico from "@/pages/instrumentista/PreparacionMaterialMedico.jsx";
import PreparacionMaterialPabellon from "@/pages/instrumentista/PreparacionMaterialPabellon.jsx";
import PreparacionMaterialDental from "@/pages/instrumentista/PreparacionMaterialDental.jsx";

function App() {
    return (
        <>
            {/* This is used to display toast notifications */}
            <Toaster />

            <BrowserRouter>
                <Routes>
                    {/* routes that uses persistent sidebar */}
                    <Route element={<SidebarLayout/>}>
                        {/* Default views todo: adjust some items from here */}
                        <Route path="/" element={<Navigate to={"/index"}/>}/>
                        <Route path="/index" element={<Index/>}/>
                        <Route path="/clientes" element={<Clientes/>}/>
                        <Route path="/material" element={<Material/>}/>
                        <Route path="/folios" element={<Folios/>}/>
                        {/* administrative/Enfermera views: todo hide this to non-permission users when roles has been implemented */}
                        <Route path="/usuarios" element={<Users/>}/>
                        <Route path="/gestion-de-tiempo" element={<GestionTiempo/>}/>
                        <Route path="/nuevo-usuario" element={<NuevoUsuario/>}/>
                        <Route path="/editar-usuario/:rut" element={<EditarUsuario/>}/>
                        {/* Instrumentista routes */}
                        <Route path="/ingreso-externo" element={<IngresoMaterialExterno/>}/>
                        <Route path="/preparacion-material-externo" element={<PreparacionMaterialExterno/>}/>
                        {/* Coordinador routes */}
                        <Route path="/modificacion-material" element={<ModificacionMaterial/>}/>
                        {/* Operador routes */}
                        <Route path="/ingreso-carga" element={<IngresoCarga/>}/>"

                        <Route path="/ingreso-pabellon" element={<IngresoMaterialPabellon/>}/>
                        <Route path="/ingreso-medico" element={<IngresoMaterialMedico/>}/>
                        <Route path="/ingreso-dental" element={<IngresoMaterialDental/>}/>
                        <Route path="/preparacion-material-pabellon" element={<PreparacionMaterialPabellon/>}/>
                        <Route path="/preparacion-material-medico" element={<PreparacionMaterialMedico/>}/>
                        <Route path="/preparacion-material-dental" element={<PreparacionMaterialDental/>}/>
                    </Route>

                    {/* routes that does not use persistent sidebar */}
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App