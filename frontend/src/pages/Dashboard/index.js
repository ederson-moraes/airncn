import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import socketio from 'socket.io-client'

import './styles.css'
function Dashboard() {
    const [spots, setSpots] = useState([])
    const [requests, setRequests] = useState([])

    const user_id = localStorage.getItem('user')

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
    }), [user_id])

    useEffect(() => {


        socket.on('booking_request', data => {
            setRequests([...requests, data])
        })

        socket.on('message', data => {
            console.log(data)
        })

        socket.emit('messagefe', 'Hello from frontend')

    }, [requests, socket])

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

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`)
            .then(() => {
                setRequests(requests.filter(req => req._id !== id))
            })
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`)
            .then(() => {
                setRequests(requests.filter(req => req._id !== id))
            })
    }

    return (
        <>

            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> is requesting a booking for <strong>{request.spot.company}</strong> in <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACCEPT</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJECT</button>
                    </li>
                ))}
            </ul>
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
