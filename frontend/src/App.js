
import React from 'react'
import './App.css'
import logo from './assets/logo.svg'

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo" />

      <div className="content">
        <p>Offer <strong>Spots</strong> to Developers and find <strong>talents</strong> for your company</p>
        <form>
          <label htmlFor="email">EMAIL *</label>
          <input id="email" type="email" placeholder="Your best email"></input>

          <button className="btn" type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
