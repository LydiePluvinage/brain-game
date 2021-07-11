import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  const [secondsLeft, setSecondsLeft] = useState(props.seconds);
  // deals with timer

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (props.playing === true) {
      props.over();
    }
  });

  return <div className="Game__Timer">Secondes restantes: {secondsLeft}</div>;
};

export default Timer;
