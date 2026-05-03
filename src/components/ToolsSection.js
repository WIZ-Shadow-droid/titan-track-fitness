import React, { useState } from 'react';

function ToolsSection() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('--');

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBmiResult('Enter valid numbers');
      return;
    }
    const bmi = (w / ((h / 100) ** 2)).toFixed(1);
    setBmiResult(`BMI: ${bmi}`);
  };

  return (
    <div className="tools-panel">
      <div className="bmi-card">
        <h3 style={{ fontFamily: 'Oswald, sans-serif' }}>BMI ANALYZER</h3>
        <div className="bmi-inputs">
          <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <button className="btn btn-sm" onClick={calculateBMI}>CALCULATE BMI</button>
        <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>
          {bmiResult === '--' || bmiResult === 'Enter valid numbers' ? bmiResult : <span>BMI: <span style={{ color: 'var(--volt)' }}>{bmiResult.split(': ')[1]}</span></span>}
        </div>
      </div>
      <div className="bmi-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', marginBottom: '1rem' }}>💡 PRO TIP</h3>
        <p style={{ textAlign: 'center', color: '#aaa' }}>Check off exercises to track progress. Hover over the green dots for form tips!</p>
      </div>
    </div>
  );
}

export default ToolsSection;