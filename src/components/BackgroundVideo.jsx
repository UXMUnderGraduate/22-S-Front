import React from 'react';

export default function BackgroundVideo() {
  return (
    <div>
      <video
        loop
        autoPlay
        muted
        id="bg-video"
        style={{
          objectFit: 'contain',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="/videos/ethereum.webm" type="video/webm" />
      </video>
    </div>
  );
}
