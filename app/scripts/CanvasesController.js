class CanvasesController {
  constructor() {
    this.brushSize = 1;
    this.brushColor = '#000000';
    this.mouse = {
      lastX: 0,
      lastY: 0,
      x: 0,
      y: 0,
      down: false
    };
  }

  generate(width, height) {
    const canvas = document.createElement('canvas');
    canvas.className = 'livePenCanvas';
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;

    const ctx = canvas.getContext('2d');
    canvas.addEventListener('mouseup', e => {
      if (e.which == 1) {
        this.mouse.down = false;
        ctx.closePath();
      }
    });
    canvas.addEventListener('mousedown', e => {
      if (e.which == 1) {
        ctx.beginPath();
        ctx.strokeStyle = this.brushColor;
        ctx.lineWidth = this.brushSize * 2;
        ctx.lineJoin = 'round';
        ctx.moveTo(e.clientX, e.clientY);
        this.mouse.down = true;
      }
    });
    canvas.addEventListener('mousemove', e => {
      if (this.mouse.down) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
      }
    });

    return canvas;
  }

  setBrushSize(size) {
    this.brushSize = size;
  }

  setBrushColor(color) {
    this.brushColor = color;
  }

  static clearCanvas(canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }
}
