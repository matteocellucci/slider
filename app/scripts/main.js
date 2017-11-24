(function() {

  const ids = ['canvas-window', 'toolbar', 'slider'];
  const domBuffer = {};
  let i = ids.length;
  while (i--) {
    const id = ids[i];
    domBuffer[id] = document.getElementById(id);
  }
  
  const slider = new Slider(domBuffer['slider']);

  const drawer = new Drawer();
  drawer.generate(slider.diaps);

  const toolbar = Object.assign(
      new Toolbar(domBuffer['toolbar']),
      Classifier(domBuffer['toolbar'])
  );

  toolbar.addUtility(
    'fullscreen-setting',
    document.getElementById('fullscreen-setting'),
    () => Fullscreener.toggle(document.documentElement)
  );
  toolbar.addUtility(
    'canvas-setting',
    document.getElementById('canvas-setting'),
    () => {
      windows.canvas.toggleClass('show'); 
      drawer.toggle();
    }
  );

  const windows = {
    canvas: Object.assign(
      new Windowable(domBuffer['canvas-window']),
      Classifier(domBuffer['canvas-window'])
    )
  };
  windows.canvas.addButton(
    'canvas-window-brush',
    document.getElementById('canvas-window-brush'),
    () => drawer.setBrush()
  );
  windows.canvas.addButton(
    'canvas-window-eraser',
    document.getElementById('canvas-window-eraser'),
    () => drawer.setEraser()
  );
  windows.canvas.addButton(
    'canvas-window-clearall',
    document.getElementById('canvas-window-clearall'),
    () => drawer.clearCanvas(slider.current)
  );
  const sizeSettingElement = document.getElementById('canvas-window-size');
  windows.canvas.addSetting(
    'canvas-window-size',
    sizeSettingElement,
    () => {
      const size = sizeSettingElement.value;
      drawer.setSize(size);
    }
  );
  const colorSettingElement = document.getElementById('canvas-window-color');
  windows.canvas.addSetting(
    'canvas-window-color',
    colorSettingElement,
    () => {
      const color = colorSettingElement.value;
      drawer.setColor(color);
    }
  );

  document.getElementById('prev-btn').addEventListener('click', () => slider.prev());
  document.getElementById('next-btn').addEventListener('click', () => slider.next());
  document.getElementById('menu-btn').addEventListener('click', () => toolbar.toggleClass('show'));
  //window.addEventListener('resize', () => canvases.resize(document.documentElement));

  const keys = {
    'ArrowRight': () => slider.next(),
    'ArrowLeft': () => slider.prev(),
    'f': () => toolbar.runKill('fullscreen-setting'),
    'd': () => toolbar.runKill('canvas-setting'),
    's': () => toolbar.toggleClass('show'),
    'B': () => drawer.setBrush(),
    'E': () => drawer.setEraser(),
    'C': () => drawer.clearCanvas(slider.current)
  };
  for (let key in keys) {
    Keyboarder.bind(key, keys[key]);
  }
  Keyboarder.init();

})();
