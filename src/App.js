//import logo from './logo.svg';
import './App.css';
import BrainGame from './Game';
import Timer from './Timer';
import { useState } from 'react';

const App = () => {
  const nbSeconds = 60;
  const [playing, setPlaying] = useState(true);
  const [nbGame, setNbGame] = useState(1);
  // App Component
  // Displays header and BrainGame component
  // <img src={logo} className="App__Logo" alt="logo" />

  const handlePlaying = () => {
    if (playing === true) {
      setPlaying(false);
    } else {
      setPlaying(true);
      setNbGame(nbGame + 1);
    }
  };

  return (
    <div className="App">
      <header className="App__Header">Play with your brain</header>
      <BrainGame playing={playing} over={handlePlaying} seconds={nbSeconds} />
      {playing && (
        <Timer
          seconds={nbSeconds}
          playing={playing}
          over={handlePlaying}
          key={nbGame}
        />
      )}
    </div>
  );
};
export default App;
