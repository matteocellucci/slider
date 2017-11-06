(function() {

  const slider = new Slider('slider');
  const toolbar = new ToolbarController('toolbar');
  const fullscreen = new FullscreenController(document.documentElement);
  const canvases = new CanvasesController();
  const canvasWindow = new ToolWindow('canvas-window');

  canvases.generate(slider.diaps);

  toolbar.setting('fullscreen-setting', fullscreen.toggle);
  toolbar.setting('canvas-setting', function() {
    canvasWindow.toggle(); 
    canvases.toggle();
  });

  canvasWindow.toolButton('canvas-window-brush', () => {
    canvases.setBrush();
  });
  canvasWindow.toolButton('canvas-window-eraser', () => {
    canvases.setEraser();
  });
  canvasWindow.toolButton('canvas-window-clearall', () => {
    canvases.clearCanvas(slider.current);
  });
  canvasWindow.toolSetting('canvas-window-size', () => {
    const selectEl = document.getElementById('canvas-window-size');
    canvases.setSize(selectEl.options[selectEl.selectedIndex].value);
  });
  canvasWindow.toolSetting('canvas-window-color', () => {
    const inputEl = document.getElementById('canvas-window-color');
    canvases.setColor(inputEl.value);
  });

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
        break;
      case 's':
        toolbar.toggle();
        break;
      case 'B':
        canvases.setBrush();
        break;
      case 'E':
        canvases.setEraser();
        break;
      case 'C':
        canvases.clearCanvas(slider.current);
        break;
      default:
        return;
    }
    e.preventDefault();
  });
})();
