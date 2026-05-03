import React from 'react';

function QuestProgress({ completed, total }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="quest-progress-container">
      <div className="quest-header">
        <div className="quest-title">⚔️ MISSION PROGRESS</div>
        <div className="quest-stats">{completed} / {total} COMPLETED</div>
      </div>
      <div className="quest-progress-bar">
        <div className={`quest-progress-fill ${percentage >= 100 ? 'completed' : ''}`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="quest-milestones">
        <span>WARM-UP</span><span>HALFWAY</span><span>FINISHER</span><span>COMPLETE</span>
      </div>
    </div>
  );
}

export default QuestProgress;