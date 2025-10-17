// src/App.jsx
import { useState } from 'react'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app-shell">
      <Navbar onNavigate={setPage} active={page} />

      <main className="main">
        {page === 'home' ? <Home /> : <Dashboard />}
      </main>

      <Footer />
    </div>
  )
}

export default App
