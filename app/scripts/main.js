(function() {
  const slider = new Slider('slider');
  const toolbar = new ToolbarController('toolbar');
  const fullscreen = new FullscreenController(document.documentElement);
  const canvasesController = new CanvasesController();

  canvasesController.generate(slider.diaps);

  toolbar.setting('fullscreen-setting', fullscreen.toggle);
  toolbar.setting('canvas-setting', function() {
    // window toggle
    canvasesController.toggle();
  });

  document.getElementById('prev-btn').addEventListener('click', slider.prev);
  document.getElementById('next-btn').addEventListener('click', slider.next);
  document.getElementById('menu-btn').addEventListener('click', toolbar.toggle);

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
      default:
        return;
    }
    e.preventDefault();
  });
})();
