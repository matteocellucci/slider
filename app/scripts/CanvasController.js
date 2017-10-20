class CanvasController {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'livePenCanvas';
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.ctx = this.canvas.getContext('2d');
    this.mouse = {
      prev: {
        x: 0,
        y: 0
      },
      x: 0,
      y: 0,
      down: false
    };

    this.canvas.addEventListener('mouseup', e => {
      if (e.which == 1) {
        this.mouse.down = false;
      }
    });
    this.canvas.addEventListener('mousedown', e => {
      if (e.which == 1) {
        this.mouse.prev.x = this.mouse.x = e.clientX - this.canvas.offsetLeft;
        this.mouse.prev.y = this.mouse.y = e.clientY - this.canvas.offsetTop;
        this.mouse.down = true;
      }
    });
    this.canvas.addEventListener('mousemove', e => {
      if (this.mouse.down) {
        this.mouse.x = e.clientX - this.canvas.offsetLeft;
        this.mouse.y = e.clientY - this.canvas.offsetTop;
        this.draw();
        this.mouse.prev.x = this.mouse.x;
        this.mouse.prev.y = this.mouse.y;
      }
    });
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.mouse.prev.x, this.mouse.prev.y);
    this.ctx.lineTo(this.mouse.x, this.mouse.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  getCanvas() {
    return this.canvas;
  }
}
