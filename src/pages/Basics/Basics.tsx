import { useEffect } from 'react';

const Basics = () => {
  const colors = ['#14140F', '#053D38', '#34675C', '#A3CCAB', '#F26800'];
  const getColor = () => {
    const i = Math.floor(Math.random() * colors.length);
    return colors[i];
  };
  useEffect(() => {
    const canvas = document.querySelector('canvas');

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cntx = canvas.getContext('2d');
      //rectangle
      if (cntx) {
        cntx.fillStyle = '#7A764F';
        cntx.fillRect(50, 50, 50, 50);

        //line
        cntx.beginPath();
        cntx.moveTo(50, 300);
        cntx.lineTo(500, 50);
        cntx.lineTo(550, 350);
        cntx.strokeStyle = '#C02F00';
        cntx.stroke();

        // arc - дуга, cicle - круг
        cntx.beginPath();
        cntx.arc(300, 300, 30, 0, Math.PI * 2, false);
        cntx.strokeStyle = colors[0];
        cntx.stroke();

        //рисует 100 кругов в рандомных местах
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          cntx.beginPath();
          cntx.arc(x, y, 20, 0, Math.PI * 2, false);
          cntx.strokeStyle = getColor();
          cntx.stroke();
        }
      }
    }
  }, []);
  return <canvas></canvas>;
};

export default Basics;
