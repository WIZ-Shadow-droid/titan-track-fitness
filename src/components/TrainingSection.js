import React, { useState, useRef, useCallback } from 'react';
import QuestProgress from './QuestProgress';
import RestTimer from './RestTimer';
import WorkoutCard from './WorkoutCard';
import PlateCalculator from './PlateCalculator';
import { workouts } from '../data/workouts';

function TrainingSection() {
  const [activeSplit, setActiveSplit] = useState('push');
  const [completedExercises, setCompletedExercises] = useState({});
  const timerRef = useRef(null);

  // Get only the exercises for the active split
  const currentWorkouts = workouts[activeSplit] || [];

  const handleToggle = useCallback((index) => {
    setCompletedExercises((prev) => {
      const updated = { ...prev };
      if (updated[index]) {
        delete updated[index];
      } else {
        updated[index] = true;
      }
      return updated;
    });
  }, []);

  const handleStartRest = useCallback((seconds) => {
    if (timerRef.current) {
      timerRef.current.setTime(seconds);
      timerRef.current.start();
    }
  }, []);

  // Reset completed exercises when switching splits
  const handleSplitChange = (split) => {
    setActiveSplit(split);
    setCompletedExercises({});
  };

  const completedCount = Object.keys(completedExercises).length;

  return (
    <>
      <QuestProgress completed={completedCount} total={currentWorkouts.length} />

      <div className="training-top-row">
        <div className="training-tabs">
          <button 
            className={`tab-btn ${activeSplit === 'push' ? 'active' : ''}`} 
            onClick={() => handleSplitChange('push')}
          >
            PUSH DAY
          </button>
          <button 
            className={`tab-btn ${activeSplit === 'pull' ? 'active' : ''}`} 
            onClick={() => handleSplitChange('pull')}
          >
            PULL DAY
          </button>
          <button 
            className={`tab-btn ${activeSplit === 'legs' ? 'active' : ''}`} 
            onClick={() => handleSplitChange('legs')}
          >
            LEGS DAY
          </button>
        </div>
        
        <RestTimer ref={timerRef} />
      </div>

      <div className="workout-grid">
        {currentWorkouts.map((exercise, index) => (
          <WorkoutCard
            key={`${activeSplit}-${index}`}
            exercise={exercise}
            index={index}
            isCompleted={!!completedExercises[index]}
            onToggle={handleToggle}
            onStartRest={handleStartRest}
          />
        ))}
      </div>

      <PlateCalculator />
    </>
  );
}

export default TrainingSection;