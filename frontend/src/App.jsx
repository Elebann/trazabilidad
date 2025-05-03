import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index.jsx"
import Login from "@/pages/Login.jsx"
import Users from "@/pages/Users.jsx"
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import Trazabilidad from "@/pages/Trazabilidad.jsx";

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
                    <Route path="/trazabilidad" element={<Trazabilidad />}/>
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