import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

import './styles.css'
function Dashboard() {
    const [spots, setSpots] = useState([])

    useEffect(() => {

        async function loadSpots() {
            if (!localStorage.getItem('user')) {
                window.location.href = '/'
            }
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })
            setSpots(response.data)
        }
        loadSpots()

    }, [])

    return (
        <>
            <ul className='spot-list'>
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>
                        <strong>{spot.company} </strong>
                        <span>{spot.price ? `€${spot.price}/day` : 'FREE'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Register new Spot</button>
            </Link>


        </>

    )
}

export default Dashboard
