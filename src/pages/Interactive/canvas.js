export const getCicles = () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');
  const colors = ['#14140F', '#053D38', '#34675C', '#A3CCAB', '#F26800'];

  // возвращает рандомный цвет
  const getColor = () => {
    const i = Math.floor(Math.random() * colors.length);
    return colors[i];
  };

  const mouse = {
    x: null,
    y: null,
  };

  const maxRadius = 40;

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = getColor();

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };

    this.update = () => {
      if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      //interactivity
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.r < maxRadius) {
          this.r += 1;
        }
      } else if (this.r > r) {
        this.r -= 1;
      }

      this.draw();
    };
  }

  let circleArr = [];

  const init = () => {
    circleArr = [];
    for (let i = 0; i < 800; i++) {
      const r = Math.random() * (4 - 1) + 1;
      const x = Math.random() * (window.innerWidth - r * 2) + r;
      const y = Math.random() * (window.innerHeight - r * 2) + r;
      const dx = (Math.random() - 0.5) * 2; // oт -4 до 4
      const dy = (Math.random() - 0.5) * 2;
      circleArr.push(new Circle(x, y, dx, dy, r));
    }
  };
  init();
  const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circleArr.map((circle) => {
      circle.update();
    });
  };

  animate();
};
