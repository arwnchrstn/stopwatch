import React from "react";

const Timer = ({ time }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="d-flex flex-column align-items-center">
        <span className="timer-time">{Math.floor(time / 3600000)}:</span>
        <span className="fw-bold fs-6">HR</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <span className="timer-time">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="fw-bold fs-6">MIN</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <span className="timer-time">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        </span>
        <span className="fw-bold fs-6">SEC</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <span className="timer-time">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
        <span className="fw-bold fs-6">MS</span>
      </div>
    </div>
  );
};

export default Timer;
