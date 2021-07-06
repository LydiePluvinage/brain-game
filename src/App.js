import logo from './logo.svg';
import './App.css';
import BrainGame from './Game';

const App = () => {
  // App Component
  // Displays header and BrainGame component
  // <img src={logo} className="App__Logo" alt="logo" />
  return (
    <div className="App">
      <header className="App__Header">Play with your brain</header>
      <BrainGame />
    </div>
  );
};
export default App;
