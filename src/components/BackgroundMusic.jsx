import React, { useRef, useState } from 'react';

// Change this to your audio file name in public/
const AUDIO_SRC = '/Cysoul - Koulos.mp3';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (!playing) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        autoPlay
        loop
        volume={0.5}
        style={{ display: 'none' }}
      />
      <button
        onClick={toggle}
        style={{
          background: playing ? '#D08161' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: 20,
          padding: '0.7em 1.2em',
          fontSize: '1.1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(90,60,40,0.10)'
        }}
        aria-label={playing ? 'Couper la musique' : 'Activer la musique'}
      >
        {playing ? '🔊 Musique' : '🔇 Muet'}
      </button>
    </div>
  );
} 