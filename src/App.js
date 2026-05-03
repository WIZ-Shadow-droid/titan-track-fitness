import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import VideoBackground from './components/VideoBackground';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Athlete');

  const handleLogin = (email) => {
    const name = email.split('@')[0] || 'Athlete';
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <>
          <VideoBackground type="login" />
          <AuthPage onLogin={handleLogin} />
        </>
      ) : (
        <>
          <VideoBackground type="dashboard" />
          <Dashboard userName={userName} onLogout={handleLogout} />
        </>
      )}
    </div>
  );
}

export default App;