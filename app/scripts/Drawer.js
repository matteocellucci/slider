class Drawer {
  constructor() {
    this.canvases = [];
    this.tool = {
      globalCompositeOperation: 'source-over',
      strokeStyle: '#000000',
      lineWidth: 2
    };
  }

  generate(conteiners) {
    for (let i = 0, l = conteiners.length; i < l; i++) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let draw = false;
    
      canvas.setAttribute('class', 'livePenCanvas');
      canvas.width = conteiners[i].offsetWidth;
      canvas.height = conteiners[i].offsetHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = 0;

      canvas.addEventListener('mouseup', (e) => {
        if (e.which === 1) {
          draw = false;
        }
        e.preventDefault();
      });

      canvas.addEventListener('mousedown', (e) => {
        if (e.which === 1) {
          draw = true;
          for (let opt in this.tool) {
            ctx[opt] = this.tool[opt];
          }
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(e.clientX, e.clientY);
        }
        e.preventDefault();
      });

      canvas.addEventListener('mousemove', (e) => {
        if (draw) {
          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
        }
        e.preventDefault();
      });
     
      this.canvases.push(Object.assign(canvas, Classifier(canvas)));
      conteiners[i].appendChild(canvas);
    }
  }

  setSize(size) {
    this.tool.lineWidth = size;
  }

  setColor(color) {
    this.tool.strokeStyle = color;
  }

  setBrush() {
    this.tool.globalCompositeOperation = 'source-over';
  }
  
  setEraser() {
    this.tool.globalCompositeOperation = 'destination-out';
  }
  
  toggle() {
    let i = this.canvases.length;
    while (i--) {
      this.canvases[i].toggleClass('show');
    }
  }

  clearCanvas(i) {
    const canvas = this.canvases[i].domElement;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }

  resize(conteiner) {
    // TODO - Know issue: context clear after resize
    const rect = conteiner.getBoundingClientRect();
    let i = this.canvases.length;
    while (i--) {
      this.canvases[i].domElement.width = rect.width;
      this.canvases[i].domElement.height = rect.height;
    }
  }
}
