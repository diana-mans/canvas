import React, { useEffect } from 'react';
import { getGame } from './canvas';

const Game = () => {
  useEffect(() => {
    getGame();
  }, []);
  return <canvas></canvas>;
};

export default Game;
