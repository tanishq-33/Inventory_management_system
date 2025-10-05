import React, { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Simple login handler
  const handleLogin = () => setLoggedIn(true);

  // Simple logout handler (optional, for dashboard logout button)
  const handleLogout = () => setLoggedIn(false);

  return (
    <>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
