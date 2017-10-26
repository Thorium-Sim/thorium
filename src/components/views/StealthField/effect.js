class Blade {
  constructor(c) {
    this.c = c;
    this.init();
  }
  init() {
    this.r = Math.random() * 200 + 100;
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight * Math.random();
    this.vy = Math.random() * 2 - 1;
    this.ax = this.x - this.r;
    this.bx = this.x + this.r;
    this.dx = Math.random() * 150 + 80;
    this.g = Math.round(Math.random() * 255);
    this.b = this.g; // Math.round(Math.random() * 10 + 155);
  }
  run() {
    this.ax += (this.x - this.ax) / this.dx;
    this.bx += (this.x - this.bx) / this.dx;
    this.y += this.vy;

    if (this.bx - this.ax < 0.5) this.init();

    this.c.strokeStyle = `rgba(${this.g}, ${this.g}, ${this.b}, 0.1)`;
    this.c.beginPath();

    this.c.moveTo(this.ax, this.y);
    this.c.lineTo(this.bx, this.y);
    this.c.stroke();
  }
}

export default class Scene {
  constructor() {
    this.canvas = document.getElementById("stealth-canvas");
    this.c = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.clear();
    this.initBlades();
    this.loop = this.loop.bind(this);
    this.loop();
  }
  loop() {
    for (let i = 0; i < 3; i++) {
      this.blades.forEach(blade => blade.run());
    }
    requestAnimationFrame(this.loop);
  }
  initBlades() {
    this.blades = [];
    this.bladeNum = 1000;
    for (let i = 0; i < this.bladeNum; i++) {
      this.blades[i] = new Blade(this.c);
    }
  }
  clear() {
    this.c.fillStyle = "black";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  resize() {
    this.clear();
  }
}
