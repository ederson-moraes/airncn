
import './App.css'
import logo from './assets/logo.svg'

import AppRoutes from './routes'

function App() {


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
