import React, { useState } from 'react';

function PlateCalculator() {
  const [targetWeight, setTargetWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const tw = parseFloat(targetWeight);
    if (isNaN(tw) || tw <= 20) {
      setResult(<span style={{ color: '#ff5e5e' }}>Enter weight above 20kg</span>);
      return;
    }
    const perSide = (tw - 20) / 2;
    const plates = { 20: 0, 10: 0, 5: 0, 2.5: 0, 1.25: 0 };
    let rem = perSide;
    [20, 10, 5, 2.5, 1.25].forEach((p) => { plates[p] = Math.floor(rem / p); rem %= p; });

    setResult(
      <div className="plate-result">
        <span style={{ color: '#aaa' }}>Per side:</span>
        {Object.entries(plates).map(([w, c]) => c > 0 ? <span key={w} className="plate-badge">{c}x {w}kg</span> : null)}
        <span style={{ color: '#aaa', marginLeft: '0.5rem' }}>Total: {tw}kg</span>
      </div>
    );
  };

  return (
    <div className="plate-calc-container">
      <div className="plate-calc-title">🏋️ WEIGHT PLATE CALCULATOR</div>
      <div className="plate-calc-inputs">
        <input type="number" placeholder="Target weight (kg)" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} />
        <button className="btn btn-sm" onClick={calculate}>CALCULATE</button>
      </div>
      {result}
    </div>
  );
}

export default PlateCalculator;