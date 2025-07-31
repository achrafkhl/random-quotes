import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState('Session');

  const timerRef = useRef(null);
  const timerLabelRef = useRef('Session');

  useEffect(() => {
    timerLabelRef.current = timerLabel;
  }, [timerLabel]);

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (!isRunning && timerLabel === 'Break') {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (!isRunning && timerLabel === 'Break') {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (!isRunning && timerLabel === 'Session') {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (!isRunning && timerLabel === 'Session') {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            const beep = document.getElementById('beep');
            beep.currentTime = 0;
            beep.play();

            if (timerLabelRef.current === 'Session') {
              setTimerLabel('Break');
              timerLabelRef.current = 'Break';
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              timerLabelRef.current = 'Session';
              return sessionLength * 60;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    timerLabelRef.current = 'Session';

    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="All">
      <div className="center">
        <div className="break-label" id='break-label'>
          <div className="up" id='break-increment' onClick={handleBreakIncrement}>up</div>
          <div className="down" id='break-decrement' onClick={handleBreakDecrement}>down</div>
          <div className="break-length" id='break-length'>{breakLength}</div>
        </div>

        <div className="session-label" id='session-label'>
          <div className="up" id='session-increment' onClick={handleSessionIncrement}>up</div>
          <div className="down" id='session-decrement' onClick={handleSessionDecrement}>down</div>
          <div className="session-length" id='session-length'>{sessionLength}</div>
        </div>

        <div className="timer">
          <div className="timer-label" id='timer-label'>{timerLabel}</div>
          <div className="time-left" id='time-left'>{formatTime(timeLeft)}</div>
          <div className="start_stop" id='start_stop' onClick={handleStartStop}>start/pause</div>
          <div className="reset" id='reset' onClick={handleReset}>reset</div>
        </div>
      </div>

      <audio
        id="beep"
        preload="auto"
        src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
      />
    </div>
  );
}

export default App;
