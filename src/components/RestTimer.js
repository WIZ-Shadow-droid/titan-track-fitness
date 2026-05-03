import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';

const TOTAL_SECONDS = 90;
const CIRCUMFERENCE = 2 * Math.PI * 21;

const RestTimer = forwardRef((props, ref) => {
  const [currentSeconds, setCurrentSeconds] = useState(TOTAL_SECONDS);
  const [isFlashing, setIsFlashing] = useState(false);
  const intervalRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const setTime = useCallback((seconds) => {
    clearTimer();
    setCurrentSeconds(seconds);
    setIsFlashing(false);
  }, [clearTimer]);

  const start = useCallback(() => {
    clearTimer();
    if (currentSeconds <= 0) {
      setCurrentSeconds(TOTAL_SECONDS);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [currentSeconds, clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setCurrentSeconds(TOTAL_SECONDS);
    setIsFlashing(false);
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  useImperativeHandle(ref, () => ({
    setTime,
    start
  }));

  const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const seconds = String(currentSeconds % 60).padStart(2, '0');
  const dashOffset = CIRCUMFERENCE * (1 - currentSeconds / TOTAL_SECONDS);

  return (
    <div className={`rest-timer-professional ${isFlashing ? 'flash' : ''}`}>
      <svg className="timer-ring-svg" viewBox="0 0 50 50">
        <circle className="timer-ring-bg" cx="25" cy="25" r="21" />
        <circle
          className="timer-ring-progress"
          cx="25"
          cy="25"
          r="21"
          strokeDasharray="131.95"
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div>
        <div className="timer-label">REST TIMER</div>
        <div className="timer-value">{minutes}:{seconds}</div>
      </div>
      <div className="timer-controls">
        <button className="timer-ctrl-btn play-btn" onClick={start}>▶</button>
        <button className="timer-ctrl-btn" onClick={pause}>⏸</button>
        <button className="timer-ctrl-btn" onClick={reset}>↺</button>
      </div>
    </div>
  );
});

export default RestTimer;