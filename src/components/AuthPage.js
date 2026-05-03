import React, { useState } from 'react';

function AuthPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [regError, setRegError] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!isValidEmail(loginEmail)) {
      setLoginError('Valid email required');
      return;
    }
    onLogin(loginEmail);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');
    if (!isValidEmail(regEmail)) {
      setRegError('Invalid email');
      return;
    }
    if (regPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    alert('Registration successful! You can now login.');
    setActiveTab('login');
    setRegName('');
    setRegEmail('');
    setRegPassword('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo-container">
          <div className="auth-logo-icon">⚡</div>
          <div className="auth-logo-text">TITANTRACK</div>
          <div className="auth-tagline">ELITE FITNESS ECOSYSTEM</div>
        </div>
        <div className="auth-form-side">
          <div className="auth-toggle">
            <span className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>LOGIN</span>
            <span className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>REGISTER</span>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                {loginError && <div className="error-msg">{loginError}</div>}
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>ACCESS DASHBOARD</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <input type="text" placeholder="Full Name" value={regName} onChange={(e) => setRegName(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                {regError && <div className="error-msg">{regError}</div>}
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password (min 6 chars)" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>CREATE ACCOUNT</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;