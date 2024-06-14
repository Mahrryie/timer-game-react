import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const targetTimeInMS = targetTime * 1000;
  const intervalMS = 10;
  const timer = useRef();
  const dialogRef = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTimeInMS);
  let timerIsActive = timeRemaining > 0 && timeRemaining < targetTimeInMS;
  const timerIsExpired = timeRemaining <= 0;

  if (timerIsExpired) {
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  function handleResetTime() {
    setTimeRemaining(targetTimeInMS);
  }

  function handleStart() {
    //countdown
    timer.current = setInterval(() => {
      setTimeRemaining((prevValue) => prevValue - intervalMS);
    }, intervalMS);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        timeLeft={timeRemaining}
        onReset={handleResetTime}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {timerIsExpired && <p>You lost</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime !== 1 && "s"}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running" : "Timer is inactive"}
        </p>
      </section>
    </>
  );
}
