// src/App.jsx
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx"; // keep your existing Home
import Dashboard from "./components/Dashboard.jsx"; // you already have this
// import Interview from "./Interview.jsx";  // if you want nested routes later
// import Overview from "./Overview.jsx";    // your pie chart page
// import Candidates from "./Candidates.jsx"; // candidates page
import "./App.css";
// TODO: wire this to real auth state (context/store/jwt)
const isAuthed = true; // placeholder for now

function ProtectedRoute({ children }) {
  return isAuthed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="app">
      <nav className="topnav">
        <h2 className="logo-text">AIRA</h2>
        <div className="nav-links">
          <NavLink to="/" className="navlink">
            Home
          </NavLink>
          <NavLink to="/dashboard" className="navlink">
            Dashboard
          </NavLink>

          {/* Only show these when NOT authenticated */}
          {!isAuthed && (
            <>
              <NavLink to="/login" className="navlink">
                Login
              </NavLink>
              <NavLink to="/signup" className="navlink">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Gate dashboard behind auth (flip isAuthed to true to test) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Auth placeholders */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// --- Simple placeholders you can replace later ---
function Login() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      {/* after successful login, set isAuthed=true (context/store) then navigate("/dashboard") */}
      <p>Build your form here. On success, navigate to Dashboard.</p>
    </div>
  );
}

function Signup() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Signup</h2>
      <p>Create account, then redirect to Dashboard or Login.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h2>404</h2>
      <p>That page went on a coffee break.</p>
    </div>
  );
}
