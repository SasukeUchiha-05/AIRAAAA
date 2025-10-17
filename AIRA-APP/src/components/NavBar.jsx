// src/components/Navbar.jsx
function Navbar({ onNavigate, active }) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => onNavigate('home')}>
          AIRA App
        </button>

        <div className="nav-links">
          <button
            className={`nav-link ${active === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${active === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
