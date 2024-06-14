import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeLeft, onReset },
  ref
) {
  const dialogRef = useRef(null);
  const timeLeftInSeconds = (timeLeft / 1000).toFixed(2);
  const userLost = timeLeftInSeconds <= 0;
  const score = Math.round((1 - timeLeft / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
      <h2>You {userLost ? "lost" : "won"}</h2>
      {!userLost && `Your score: ${score}`}
      <p>
        The target time was {targetTime} second{targetTime !== 1 && "s"}
      </p>
      <p>
        You stopped the timer with {timeLeftInSeconds} second
        {timeLeftInSeconds && "s"} left
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
