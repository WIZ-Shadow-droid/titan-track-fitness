import React, { useState } from 'react';

function WorkoutCard({ exercise, index, isCompleted, onToggle, onStartRest }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`exercise-card ${isCompleted ? 'completed' : ''}`}>
      <div className="exercise-image-container">
        {!imgError ? (
          <img 
            src={exercise.img} 
            alt={exercise.name} 
            loading="lazy" 
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '200px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '4rem', 
            background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' 
          }}>
            🏋️
          </div>
        )}
        <input 
          type="checkbox" 
          className="exercise-checkbox" 
          checked={isCompleted} 
          onChange={() => onToggle(index)} 
          title="Mark completed" 
        />
        {exercise.tooltips && exercise.tooltips.map((tip, i) => (
          <div key={i} className="tooltip-wrapper" style={{ left: `${tip.x}%`, top: `${tip.y}%` }}>
            <div className="tooltip-dot">+</div>
            <div className="tooltip-content" style={{ 
              [tip.x > 60 ? 'right' : 'left']: '30px', 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }}>
              {tip.text}
            </div>
          </div>
        ))}
      </div>
      <div className="exercise-info">
        <div className="exercise-name">{exercise.name}</div>
        <div className="metrics">
          <span>🔁 {exercise.sets}</span>
          <span>⏱️ {exercise.rest}</span>
        </div>
        <button className="rest-timer-btn" onClick={() => onStartRest(parseInt(exercise.rest) || 90)}>
          ▶ START REST
        </button>
      </div>
    </div>
  );
}

export default WorkoutCard;