import React, { useState } from 'react';
import Navbar from './Navbar';
import TrainingSection from './TrainingSection';
import MealPlanSection from './MealPlanSection';
import ToolsSection from './ToolsSection';
import QrModal from './QrModal';

function Dashboard({ userName, onLogout }) {
  const [activeSection, setActiveSection] = useState('training');
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="dashboard">
      <Navbar userName={userName} onLogout={onLogout} onShowQr={() => setShowQr(true)} />
      <div className="container">
        <h2 style={{ margin: '1.5rem 0 0.5rem', fontSize: '2.2rem', fontFamily: 'Oswald, sans-serif' }}>
          PERFORMANCE <span style={{ color: 'var(--volt)' }}>HUB</span>
        </h2>

        <div className="dashboard-nav">
          <button className={`nav-tab ${activeSection === 'training' ? 'active' : ''}`} onClick={() => setActiveSection('training')}>🏋️ TRAINING</button>
          <button className={`nav-tab ${activeSection === 'meal-plan' ? 'active' : ''}`} onClick={() => setActiveSection('meal-plan')}>🍽️ MEAL PLAN</button>
          <button className={`nav-tab ${activeSection === 'tools' ? 'active' : ''}`} onClick={() => setActiveSection('tools')}>🔧 TOOLS</button>
        </div>

        {activeSection === 'training' && <TrainingSection />}
        {activeSection === 'meal-plan' && <MealPlanSection />}
        {activeSection === 'tools' && <ToolsSection />}
      </div>

      {showQr && <QrModal userName={userName} onClose={() => setShowQr(false)} />}
    </div>
  );
}

export default Dashboard;