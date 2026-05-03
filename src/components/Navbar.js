import React from 'react';

function Navbar({ userName, onLogout, onShowQr }) {
  return (
    <nav className="navbar">
      <div className="logo">TITANTRACK ELITE</div>
      <div className="user-badge">
        <span>{userName}</span>
        <button className="btn btn-sm" style={{ borderColor: '#FFD700', color: '#FFD700' }} onClick={onShowQr}>📱 SHOW MY ID</button>
        <button className="btn btn-sm" style={{ borderColor: '#555' }} onClick={onLogout}>LOGOUT</button>
      </div>
    </nav>
  );
}

export default Navbar;