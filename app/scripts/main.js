(function() {

  const ids = ['canvas-window', 'toolbar', 'slider'];
  const domBuffer = {};
  let i = ids.length;
  while (i--) {
    const id = ids[i];
    domBuffer[id] = document.getElementById(id);
  }

  const windows = {
    canvas: new Windowable(domBuffer['canvas-window'])
  };
  const toolbar = new Toolbar(domBuffer['toolbar']);
  
  const slider = new Slider('slider');
  const canvases = new CanvasesController();

  canvases.generate(slider.diaps);

  toolbar.addUtility(
    'fullscreen-setting',
    document.getElementById('fullscreen-setting'),
    () => Fullscreener.toggle(document.documentElement)
  );
  toolbar.addUtility(
    'canvas-setting',
    document.getElementById('canvas-setting'),
    () => {
      windows.canvas.toggle(); 
      canvases.toggle();
    }
  );

  windows.canvas.addButton(
    'canvas-window-brush',
    document.getElementById('canvas-window-brush'),
    () => canvases.setBrush()
  );
  windows.canvas.addButton(
    'canvas-window-eraser',
    document.getElementById('canvas-window-eraser'),
    () => canvases.setEraser()
  );
  windows.canvas.addButton(
    'canvas-window-clearall',
    document.getElementById('canvas-window-clearall'),
    () => canvases.clearCanvas(slider.current)
  );
  const sizeSettingElement = document.getElementById('canvas-window-size');
  windows.canvas.addSetting(
    'canvas-window-size',
    sizeSettingElement,
    () => {
      const sizeIndex = sizeSettingElement.selected;
      const size = sizeSettingElement[sizeIndex].value;
      canvases.setSize(size);
    }
  );
  const colorSettingElement = document.getElementById('canvas-window-color');
  windows.canvas.addSetting(
    'canvas-window-color',
    colorSettingElement,
    () => {
      const color = colorSettingElement.value;
      canvases.setColor(color);
    }
  );

  document.getElementById('prev-btn').addEventListener('click', slider.prev);
  document.getElementById('next-btn').addEventListener('click', slider.next);
  document.getElementById('menu-btn').addEventListener('click', () => toolbar.toggle());
  window.addEventListener('resize', () => canvases.resize(document.documentElement));

  const keys = {
    'ArrowRight': () => slider.next(),
    'ArrowLeft': () => slider.prev(),
    'f': () => toolbar.runKill('fullscreen-setting'),
    'd': () => {
      toolbar.runKill('canvas-setting');
      canvases.toggle();
    },
    's': () => toolbar.toggle(),
    'B': () => canvases.setBrush(),
    'E': () => canvases.setEraser(),
    'C': () => canvases.clearCanvas(slider.current)
  };
  for (let key in keys) {
    Keyboarder.bind(key, keys[key]);
  }
  Keyboarder.init();
})();
