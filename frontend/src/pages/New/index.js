import React, { useState, useMemo } from "react"
import camera from '../../assets/camera.svg'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
function New() {

    const navigate = useNavigate()
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }
        , [thumbnail])



    async function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData()
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price === '' ? '0' : price)


        await api.post('/spots', data, {
            headers: {
                user_id
            }
        })
        navigate('/dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select image" />

            </label>
            <label htmlFor="company" >Company</label>
            <input
                id="company"
                name="company"
                placeholder="Your awesome company"
                value={company}
                onChange={event => setCompany(event.target.value)} />

            <label htmlFor="techs" >Technologies *<span>separated by comma(,)</span></label>
            <input
                id="techs"
                name="techs"
                placeholder="Your awesome technologies"
                value={techs}
                onChange={event => setTechs(event.target.value)} />

            <label htmlFor="price">Price *<span>empty for free</span></label>
            <input
                id="price"
                name="price"
                placeholder="Your awesome price"
                value={price}
                onChange={event => setPrice(event.target.value)} />

            <button type="submit" className="btn">Register</button>
        </form>
    )
}

export default New
