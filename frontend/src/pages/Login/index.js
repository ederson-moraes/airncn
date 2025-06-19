
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

function Login() {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await api.post('/sessions', { email })
        const { _id } = response.data
        localStorage.setItem('user', _id)

        navigate('/dashboard')
    }
    return (
        <>
            <p>Offer <strong>Spots</strong> to Developers and find <strong>talents</strong> for your company</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">EMAIL *</label>
                <input id="email" type="email" placeholder="Your best email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}></input>

                <button className="btn" type='submit'>Submit</button>
            </form>
        </>
    )

}

export default Login
