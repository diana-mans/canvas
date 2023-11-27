export const getGravityCicle = () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');
  const colors = ['#14140F', '#053D38', '#34675C', '#A3CCAB', '#F26800'];

  // возвращает рандомный цвет
  const getRandomColor = () => {
    const i = Math.floor(Math.random() * colors.length);
    return colors[i];
  };
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min + 1) + min; // The maximum is inclusive and the minimum is inclusive
  }

  const gravity = 1;
  const friction = 0.9;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('click', () => {
    init();
  });

  function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = radius;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };

    this.update = () => {
      if (this.y + this.r + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
        this.dx = this.dx * friction;
      } else {
        this.dy += gravity;
      }
      if (this.x + this.r + this.dx > canvas.width || this.x - this.r < 0) {
        this.dx = -this.dx * friction;
      }

      this.y += this.dy;
      this.x += this.dx;

      this.draw();
    };
  }
  let ballArr = [];
  const init = () => {
    ballArr = [];
    for (let i = 0; i < 50; i++) {
      const radius = getRandomInt(10, 30);
      const x = getRandomInt(radius, canvas.width - radius);
      const y = getRandomInt(radius, canvas.height - radius);
      const dx = getRandomInt(-2, 2);
      const dy = getRandomInt(-2, 2);

      const color = getRandomColor();

      const ball = new Ball(x, y, dx, dy, radius, color);
      ballArr.push(ball);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ballArr.map((ball) => ball.update());
  };
  init();
  animate();
};
