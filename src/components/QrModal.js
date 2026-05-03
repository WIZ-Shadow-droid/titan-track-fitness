import React from 'react';

function QrModal({ userName, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--volt)' }}>MEMBERSHIP ID</h3>
        <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{userName}</div>
        <div style={{ color: '#FFD700', fontWeight: 700 }}>ELITE MEMBER</div>
        <div className="qr-placeholder">🏋️</div>
        <p style={{ color: '#aaa', fontSize: '0.8rem' }}>Scan at gym entrance</p>
      </div>
    </div>
  );
}

export default QrModal;