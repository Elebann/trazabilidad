import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index.jsx"
import Login from "@/pages/Login.jsx"
import Users from "@/pages/Users.jsx"
import Folios from "@/pages/Folios.jsx"
import Material from "@/pages/Material.jsx"
import Clientes from "@/pages/Clientes.jsx"
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import GestionTiempo from '@/pages/GestionTiempo.jsx';

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* routes that uses persistent sidebar */}
                <Route element={<SidebarLayout />}>
                    {/* Default views */}
                    <Route path="/" element={<Navigate to={"/index"}/>}/>
                    <Route path="/index" element={<Index />}/>
                    <Route path="/clientes" element={<Clientes />}/>
                    <Route path="/material" element={<Material />}/>
                    <Route path="/folios" element={<Folios />}/>
                    {/* administrative views: todo make these links only visible for Administrator role */}
                    <Route path="/gestion-de-usuarios" element={<Users />}/>
                    <Route path="/gestion-de-tiempo" element={<GestionTiempo />} />
                </Route>

                {/* routes that does not use persistent sidebar */}
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App