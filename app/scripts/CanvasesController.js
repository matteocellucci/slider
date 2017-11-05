class CanvasesController {
  constructor() {
    this.canvases = [];
    this.show = false;
    this.brushSize = 1;
    this.brushColor = '#000000';
    this.mouse = {
      lastX: 0,
      lastY: 0,
      x: 0,
      y: 0,
      down: false
    };
    this.resize = this.resize.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  generate(elems) {
    for (let i = 0; i < elems.length; i++) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
    
      canvas.setAttribute('class', 'livePenCanvas');
      canvas.width = elems[i].offsetWidth;
      canvas.height = elems[i].offsetHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = 0;

      canvas.addEventListener('mouseup', e => {
        if (e.which == 1) {
          this.mouse.down = false;
          ctx.closePath();
        }
        e.preventDefault();
      });
      canvas.addEventListener('mousedown', e => {
        if (e.which == 1) {
          ctx.beginPath();
          ctx.strokeStyle = this.brushColor;
          ctx.lineWidth = this.brushSize * 2;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.moveTo(e.clientX, e.clientY);
          this.mouse.down = true;
        }
        e.preventDefault();
      });
      canvas.addEventListener('mousemove', e => {
        if (this.mouse.down) {
          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
        }
        e.preventDefault();
      });
     
      this.canvases.push(canvas);
      elems[i].appendChild(canvas);
    }
  }

  resize(ref) {
    let rect, i;
    // TODO - Know issue: context clear after resize
    
    i = this.canvases.length;
    rect = ref.getBoundingClientRect();
    while (i--) {
      this.canvases[i].width = rect.width;
      this.canvases[i].height = rect.height;
    }
  }

  toggle() {
    for (let i = 0; i < this.canvases.length; i++) {
      let curr = this.canvases[i].getAttribute('class');
      if (this.show) {
        curr = curr.split(/\s+show\s+/).join(" ");
        this.canvases[i].setAttribute('class', curr);
      }
      else {
        this.canvases[i].setAttribute('class', curr + ' show ');
      }
    }
    this.show = !this.show;
  }

  setBrushSize(size) {
    this.brushSize = size;
  }

  setBrushColor(color) {
    this.brushColor = color;
  }

  clearCanvas(i) {
    const canvas = this.canvases[i];
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }
}
