import './App.css'
import React, { useState ,useEffect} from 'react';

const sounds = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];
function App() {
  
  const [display, setDisplay] = useState('');

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      const sound = sounds.find(s => s.key === key);
      setDisplay(sound ? sound.id : '');
    }
  };

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if (sounds.some(s => s.key === key)) {
      playSound(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
  <div className="All">
    <div className="drum" id="drum-machine">
      <div className="left">
        <div className="title">
          <h1>Drum Machine</h1>
          <p>Click or press a key to play a sound</p>
        </div>
        <div className="pad-grid">
          <button className="drum-pad" onClick={() => playSound("Q")} id="Heater-1">
            Q
            <audio className="clip" id="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("W")} id="Heater-2">
            W
            <audio className="clip" id="W" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("E")} id="Heater-3">
            E
            <audio className="clip" id="E" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("A")} id="Heater-4">
            A
            <audio className="clip" id="A" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("S")} id="Clap">
            S
            <audio className="clip" id="S" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("D")} id="Open-HH">
            D
            <audio className="clip" id="D" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("Z")} id="Kick-n'-Hat">
            Z
            <audio className="clip" id="Z" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("X")} id="Kick">
            X
            <audio className="clip" id="X" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
          </button>
          <button className="drum-pad" onClick={() => playSound("C")} id="Closed-HH">
            C
            <audio className="clip" id="C" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
          </button>
        </div>
      </div>
      <div className="right">
        <div className="display" id="display">
          <h2>{display}</h2>
        </div>
      </div>
    </div>
  </div>
);

}

export default App
