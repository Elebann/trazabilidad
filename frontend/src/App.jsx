import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index.jsx"
import Login from "@/pages/Login.jsx"

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/index"}/>} />
                <Route path="/index" element={<Index />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App