import { useEffect } from 'react';
import { getGravityCicle } from './canvas';

const Gravity = () => {
  useEffect(() => {
    getGravityCicle();
  }, []);
  return <canvas></canvas>;
};

export default Gravity;
