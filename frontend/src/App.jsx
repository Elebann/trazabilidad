import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index.jsx"
import Login from "@/pages/Login.jsx"
import Users from "@/pages/Users.jsx"
import Folios from "@/pages/Folios.jsx"
import Material from "@/pages/Material.jsx"
import Clientes from "@/pages/Clientes.jsx"
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import Trazabilidad from "@/pages/Material.jsx";
import Gestiontiempo from './pages/Gestiontiempo'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* routes that uses persistent sidebar */}
                <Route element={<SidebarLayout />}>
                    <Route path="/" element={<Navigate to={"/index"}/>}/>
                    <Route path="/index" element={<Index />}/>
                    <Route path="/users" element={<Users />}/>
                    <Route path="/clientes" element={<Clientes />}/>
                    <Route path="/material" element={<Material />}/>
                    <Route path="/folios" element={<Folios />}/>
                    <Route path="/gestiontiempo" element={<Gestiontiempo />} />
                    {/* Add more routes here */}
                </Route>
                {/* routes that does not use persistent sidebar */}
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App