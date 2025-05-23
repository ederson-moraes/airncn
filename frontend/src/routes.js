import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import New from './pages/New'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new" element={<New />} />
            </Routes>
        </BrowserRouter>
    )
}