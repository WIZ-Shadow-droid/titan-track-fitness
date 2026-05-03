import React from 'react';

function VideoBackground({ type }) {
  return (
    <>
      <video autoPlay muted loop playsInline className={`video-background ${type}`}>
        <source src="https://cdn.coverr.co/videos/coverr-gym-workout-1584/1080p.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </>
  );
}

export default VideoBackground;