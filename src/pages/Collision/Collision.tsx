import React, { useEffect } from 'react';
import { getCollisionDetection, getParticleDetection, getRectangularCollision } from './canvas';

const Collision = () => {
  useEffect(() => {
    getRectangularCollision();
  }, []);
  return <canvas></canvas>;
};

export default Collision;
