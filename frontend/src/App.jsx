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
import IngresoMaterial from "@/pages/instrumentista/IngresoMaterial.jsx";
import PreparacionMaterial from "@/pages/instrumentista/PreparacionMaterial.jsx";
import ModificacionMaterial from "@/pages/coordinador/ModificacionMaterial.jsx";
import IngresoCarga from "@/pages/operador/IngresoCarga.jsx";
import { Toaster } from 'react-hot-toast';

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
                        <Route path="/gestion-de-usuarios" element={<Users/>}/>
                        <Route path="/gestion-de-tiempo" element={<GestionTiempo/>}/>
                        {/* Instrumentista routes */}
                        <Route path="/ingreso-material" element={<IngresoMaterial/>}/>
                        <Route path="/preparacion-material" element={<PreparacionMaterial/>}/>
                        {/* Coordinador routes */}
                        <Route path="/modificacion-material" element={<ModificacionMaterial/>}/>
                        {/* Operador routes */}
                        <Route path="/ingreso-carga" element={<IngresoCarga/>}/>"
                    </Route>

                    {/* routes that does not use persistent sidebar */}
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App