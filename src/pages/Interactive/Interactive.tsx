import { useEffect } from 'react';
import { getCicles } from './canvas';

const Interactive = () => {
  useEffect(() => {
    getCicles();
  }, []);
  return <canvas></canvas>;
};

export default Interactive;
