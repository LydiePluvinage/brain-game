import logo from './logo.svg';
import './App.css';
import BrainGame from './Game';

const App = () => {
  // App Component
  // Displays header and BrainGame component
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Play with your brain
      </header>
      <BrainGame />
    </div>
  );
};
export default App;
