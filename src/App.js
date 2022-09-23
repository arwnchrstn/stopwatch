import React, { useState, useEffect } from "react";

import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import Laps from "./components/Laps";
import Timer from "./components/Timer";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [supportPWA, setSupportPWA] = useState(null);
  const [promptInstall, setPromptInstall] = useState(null);

  //Trigger install prompt
  const handleInstall = (e) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  //start stopwatch
  const start = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  //pause stopwatch
  const pause = () => {
    setIsPaused(!isPaused);
  };

  //reset stopwatch
  const reset = () => {
    setIsStarted(false);
    setIsPaused(true);
    setTime(0);
    setLaps([]);
  };

  //add new lap
  const newLap = () => {
    setLaps((prevLaps) => [{ no: laps.length + 1, time }, ...prevLaps]);
  };

  useEffect(() => {
    let interval = null;

    if (isStarted === true && isPaused === false) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPaused, isStarted]);

  useEffect(() => {
    const handler = async (e) => {
      e.preventDefault();
      setSupportPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  return (
    <div className="main-container container">
      <div className="timer p-4">
        {supportPWA && (
          <button
            className="btn btn-outline-dark d-block mx-auto fw-bold px-4"
            onClick={handleInstall}
          >
            Install
          </button>
        )}

        <Timer time={time} />
        {!isStarted && (
          <button
            className="btn btn-success d-block mx-auto px-4 fw-bold"
            onClick={start}
          >
            Start
          </button>
        )}

        {isStarted && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-success fw-bold mx-2" onClick={pause}>
              {isPaused ? "Resume" : "Pause"}
            </button>

            <button className="btn btn-danger fw-bold mx-2" onClick={reset}>
              Reset
            </button>

            {!isPaused && (
              <button className="btn btn-info fw-bold mx-2" onClick={newLap}>
                New Lap
              </button>
            )}
          </div>
        )}
      </div>

      <AnimateSharedLayout>
        <motion.div
          layout
          className="laps p-3 shadow mx-2 mx-md-3 rounded"
          initial={{ opacity: 0, transition: { duration: 0.5 } }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5 }
          }}
        >
          <motion.h4 layout className="fw-bold mb-4">
            Laps
          </motion.h4>

          <AnimatePresence>
            {laps.length !== 0 &&
              laps.map((lap) => (
                <motion.div
                  className="row lap-container my-2 shadow-sm mx-1 p-1"
                  key={lap.no}
                  initial={{
                    opacity: 0,
                    x: -30,
                    transition: { duration: 0.5 }
                  }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
                >
                  <div className="col-6">
                    <h5 className="m-0 fw-bold">{lap.no}</h5>
                  </div>
                  <div className="col-6">
                    <h5 className="m-0 text-end">
                      <Laps time={lap.time} />
                    </h5>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
}

export default App;
