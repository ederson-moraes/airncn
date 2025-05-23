
import React, { useState } from 'react'
import api from './services/api'
import './App.css'
import logo from './assets/logo.svg'

import AppRoutes from './routes'

function App() {
  const [email, setEmail] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await api.post('/sessions', { email })
    const { _id } = response.data
    localStorage.setItem('user', _id)
  }

  return (
    <div className="container">
      <img src={logo} alt="Logo" />

      <div className="content">
        <AppRoutes />

      </div>
    </div>
  )
}

export default App
