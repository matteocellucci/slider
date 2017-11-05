class CanvasesController {
  constructor() {
    this.canvases = [];
    this.show = false;
    this.size = 1;
    this.color = '#000000';
    this.tool = 'brush';
    this.resize = this.resize.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  generate(elems) {
    for (let i = 0; i < elems.length; i++) {
      let canvas, ctx, draw;

      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      draw = false;
    
      canvas.setAttribute('class', 'livePenCanvas');
      canvas.width = elems[i].offsetWidth;
      canvas.height = elems[i].offsetHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = 0;

      canvas.addEventListener('mouseup', e => {
        if (e.which == 1) {
          ctx.closePath();
          draw = false;
        }
        e.preventDefault();
      });
      canvas.addEventListener('mousedown', e => {
        if (e.which == 1) {
          draw = true;
          if (this.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
          }
          else {
            ctx.globalCompositeOperation = 'source-over';
          }
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size * 2;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(e.clientX, e.clientY);
        }
        e.preventDefault();
      });
      canvas.addEventListener('mousemove', e => {
        if (draw) {
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

  setSize(size) {
    this.size = size;
  }

  setColor(color) {
    this.color = color;
  }

  setEraser() {
    this.tool = 'eraser';
  }

  setBrush() {
    this.tool = 'brush';
  }

  clearCanvas(i) {
    const canvas = this.canvases[i];
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }
}
