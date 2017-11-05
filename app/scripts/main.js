(function() {
  let canvasToolSize;

  const slider = new Slider('slider');
  const toolbar = new ToolbarController('toolbar');
  const fullscreen = new FullscreenController(document.documentElement);
  const canvases = new CanvasesController();
  const canvasWindow = new ToolWindow('canvas-window');
  canvasToolSize = 1;

  canvases.generate(slider.diaps);

  toolbar.setting('fullscreen-setting', fullscreen.toggle);
  toolbar.setting('canvas-setting', function() {
    canvasWindow.toggle(); 
    canvases.toggle();
  });

  canvasWindow.tool('canvas-window-brush', () => {
    canvases.setBrush();
  });
  canvasWindow.tool('canvas-window-eraser', () => {
    canvases.setEraser()
  });
  canvasWindow.tool('canvas-window-size', () => {
    canvasToolSize = (canvasToolSize > 5) ? 1 : canvasToolSize + 1;
    const b = document.getElementById('canvas-window-size');
    b.style.fontSize = (canvasToolSize * 0.125) + 'rem';
    canvases.setSize(canvasToolSize)
  });
  canvasWindow.tool('canvas-window-color', () => console.log('brush'));
  canvasWindow.tool('canvas-window-clearall', () => canvases.clearCanvas(slider.current));

  document.getElementById('prev-btn').addEventListener('click', slider.prev);
  document.getElementById('next-btn').addEventListener('click', slider.next);
  document.getElementById('menu-btn').addEventListener('click', toolbar.toggle);
  window.addEventListener('resize', () => canvases.resize(document.documentElement));

  window.addEventListener('keydown', e => {
    console.log(e.key);
    switch (e.key) {
      case 'ArrowRight':
        slider.next();
        break;
      case 'ArrowLeft':
        slider.prev();
        break;
      case 'f':
        toolbar.reverse('fullscreen-setting');
        fullscreen.toggle();
        break;
      case 'd':
        toolbar.reverse('canvas-setting');
        canvasWindow.toggle();
        canvases.toggle();
      default:
        return;
    }
    e.preventDefault();
  });
})();
