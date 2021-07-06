import './Game.css';
import React, { useEffect, useState } from 'react';

const BrainGame = () => {
  // BrainGame component
  // Sets the game and calculates scores
  // Resets words and colors
  // Deals with timer
  const [gameId, setGameId] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [validColor, setValidColor] = useState(
    pickRandomColor(Object.entries(Colors))
  );
  const [colorsList, setColorsList] = useState(
    shuffleArray(Object.entries(Colors))
  );
  const [wordsList, setWordsList] = useState(
    shuffleArray(shuffleWords(Object.entries(Colors)))
  );

  // deals with timer
  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const gameOver = secondsLeft === 0;
  console.log(secondsLeft);
  console.log(gameOver);

  // function that shuffles an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // function that mixes words and colors
  function shuffleWords(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i][1], array[j][1]] = [array[j][1], array[i][1]];
    }
    return array;
  }

  // Randomly chooses a color between the list of available colors
  function pickRandomColor(array) {
    const j = Math.floor(Math.random() * array.length);
    return array[j][0];
  }

  // compares answer given and valid color
  // increments correct answers if needed
  // resets words
  function checkAnswerAndReset(colorChosen) {
    if (colorChosen === validColor) {
      setCorrectAnswers(correctAnswers + 1);
    }
    startNewGame(false);
  }

  // resets all state elements for the new game
  function startNewGame(newGame) {
    setValidColor(pickRandomColor(Object.entries(Colors)));
    setWordsList(shuffleArray(shuffleWords(Object.entries(Colors))));
    setColorsList(shuffleArray(Object.entries(Colors)));
    setGameId(0);
    if (newGame) {
      setCorrectAnswers(0);
      setGameId(0);
      setSecondsLeft(60);
    } else {
      setGameId(gameId + 1);
    }
  }

  return (
    <>
      {gameOver === true ? (
        <PlayAgain score={correctAnswers} onClick={() => startNewGame} />
      ) : (
        <>
          <Game
            key={gameId}
            validColor={validColor}
            checkAnswer={checkAnswerAndReset}
            colors={colorsList}
            words={wordsList}
          />
          <div className="answers">Bonnes réponses: {correctAnswers}</div>
          <div className="timer">Secondes restantes: {secondsLeft}</div>
        </>
      )}
    </>
  );
};

// one instance of the game
const Game = (props) => {
  return (
    <div className="Game">
      <div className="Game__Words">
        {props.words.map((color) => (
          <ColorWord
            key={color[0]}
            name={color[0]}
            color={color[1]}
            selected={color[0] === props.validColor}
          />
        ))}
      </div>
      <div className="Game__Colors">
        {props.colors.map((color) => (
          <ColorButton
            key={color[0]}
            name={color[0]}
            backgroundColor={color[1]}
            onClick={() => props.checkAnswer(color[0])}
          />
        ))}
      </div>
    </div>
  );
};

// play again button, when timer is over
const PlayAgain = (props) => (
  <>
    <div className="Game-Over">{'Votre score est de ' + props.score}</div>
    <button onClick={props.onClick(true)}>Rejouez</button>
  </>
);

// component displaying the colors
const ColorButton = (props) => {
  return (
    <button
      className="Game__Button"
      style={{ backgroundColor: props.backgroundColor }}
      onClick={props.onClick}
    ></button>
  );
};

// component displaying the game words
const ColorWord = (props) => {
  return (
    <div
      className="Game__Div"
      style={{
        border: props.selected === true ? '5px solid ' + props.color : 'none',
      }}
    >
      <span style={{ color: props.color }}>{props.name}</span>
    </div>
  );
};

// list of available colors
const Colors = {
  Rouge: 'red',
  Jaune: '#FFFF00',
  Vert: 'green',
  Bleu: 'blue',
  Noir: 'black',
  Orange: 'orange',
  Violet: 'violet',
  Marron: 'saddlebrown',
  Turquoise: 'turquoise',
};

export default BrainGame;
