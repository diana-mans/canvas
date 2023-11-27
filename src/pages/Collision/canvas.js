export const getCollisionDetection = () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');

  const mouse = {
    x: null,
    y: null,
  };

  const getDistance = (x1, y1, x2, y2) => {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('click', () => {
    init();
  });

  window.addEventListener('mousemove', (ev) => {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
  });

  function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
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
      this.draw();
    };
  }
  let circle1;
  let circle2;
  const init = () => {
    circle1 = new Circle(canvas.width / 2, canvas.height / 2, 50, 'black');
    circle2 = new Circle(null, null, 20, 'red');
  };

  const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.r + circle2.r) {
      circle1.color = 'yellow';
    } else {
      circle1.color = 'black';
    }
  };
  init();
  animate();
};

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

export const getParticleDetection = () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');
  const colors = ['#1a0702', '#60362a', '#0c9476', '#e2a247', '#d13c0b'];

  const mouse = {
    x: null,
    y: null,
  };
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

  const getDistance = (x1, y1, x2, y2) => {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  function rotate(velocity, angle) {
    const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };

    return rotatedVelocities;
  }

  function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Предотвращение случайного перекрытия частиц
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      // Угол между двумя сталкивающимися частицами
      const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

      // Масса каждого элемента
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Высчитываем угол после поворота на угол, при котором частицы сталкиваются
      // Делается это для того, чтобы можно было применить уравление для одномерного пространтва
      // Типа частицы движутся друг на друга по одной оси
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Уравнение скорости после 1d столкновения
      // Делаем только для одной оси, потому что специально для этого повернули частицы
      const v1 = { x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2), y: u1.y };
      const v2 = { x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2), y: u2.y };

      // Конечная скорость после поворота оси обратно в исходное положение
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Меняем скорости частиц для реалистичного эффекта отскока.
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
    }
  }

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('click', () => {
    init();
  });

  window.addEventListener('mousemove', (ev) => {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
  });

  function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: getRandomInt(-2.0, 2.0),
      y: getRandomInt(-2.0, 2.0),
    };
    this.r = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.opacity;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    };

    this.update = (particles) => {
      for (let i = 0; i < particles.length; i++) {
        if (particles[i] === this) continue;

        if (getDistance(this.x, this.y, particles[i].x, particles[i].y) < this.r * 2) {
          resolveCollision(this, particles[i]);
        }
      }

      if (this.x + this.r > canvas.width || this.x - this.r < 0) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.y + this.r > canvas.height || this.y - this.r < 0) {
        this.velocity.y = -this.velocity.y;
      }

      if (getDistance(this.x, this.y, mouse.x, mouse.y) < 80 && this.opacity < 0.2) {
        this.opacity += 0.02;
      } else if (this.opacity > 0) {
        this.opacity -= 0.02;

        this.opacity = Math.max(0, this.opacity);
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;

      this.draw();
    };
  }
  let particles;
  const init = () => {
    particles = [];
    const radius = 15;
    for (let i = 0; i < 150; i++) {
      let x = getRandomInt(radius, canvas.width - radius);
      let y = getRandomInt(radius, canvas.height - radius);
      const color = getRandomColor();

      if (i !== 0) {
        for (let j = 0; j < particles.length; j++) {
          if (getDistance(x, y, particles[j].x, particles[j].y) < radius * 2) {
            x = getRandomInt(radius, canvas.width - radius);
            y = getRandomInt(radius, canvas.height - radius);

            j = -1;
          }
        }
      }

      particles.push(new Particle(x, y, radius, color));
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    particles.map((particle) => particle.update(particles));
  };
  init();
  animate();
};

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

export const getRectangularCollision = () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');

  const mouse = {
    x: null,
    y: null,
  };

  const getIsCillide = (rect1, rect2) => {
    const isGorizontalCollide = rect1.x + rect1.width > rect2.x && rect1.x < rect2.x + rect2.width;
    const isVerticalCollide = rect1.y + rect1.height > rect2.y && rect1.y < rect2.y + rect2.height;

    if (isGorizontalCollide && isVerticalCollide) {
      return true;
    } else {
      return false;
    }
  };

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('click', () => {
    init();
  });

  window.addEventListener('mousemove', (ev) => {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
  });

  function Rect(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    };

    this.update = () => {
      this.draw();
    };
  }
  let rect1;
  let rect2;
  const init = () => {
    rect1 = new Rect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100, 'black');
    rect2 = new Rect(null, null, 60, 60, 'red');
  };

  const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    rect1.update();
    rect2.x = mouse.x - 30;
    rect2.y = mouse.y - 30;
    rect2.update();

    if (getIsCillide(rect1, rect2)) {
      rect1.color = 'yellow';
    } else {
      rect1.color = 'black';
    }
  };
  init();
  animate();
};
