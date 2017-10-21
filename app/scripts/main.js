jQuery(function($) {
  // Objects
  const fullscreen = new FullscreenController(document.documentElement);
  const canvasesController = new CanvasesController();
  let $current = $('.diapositive.current');
  let isTransitionEnd = true;

  // Init
  $('.diapositive').each(function() {
    const $this = $(this);
    const canvas = canvasesController.generate($this.width(), $this.height());
    $this.append(canvas);
  });

  // Functions
  const bindTransitionEnd = function() {
    isTransitionEnd = false;
    $current.one(
      'webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend',
      function(e) {
        isTransitionEnd = true;
      }
    );
  };
  const slideLeft = function() {
    if (isTransitionEnd) {
      const $next = $current.next();
      if ($next.length > 0) {
        $current.removeClass('current').addClass('prev');
        $next.addClass('current');
        $current = $next;
        bindTransitionEnd();
      }
    }
  };
  const slideRight = function() {
    if (isTransitionEnd) {
      const $prev = $current.prev();
      if ($prev.length > 0) {
        $current.removeClass('current');
        $prev.removeClass('prev').addClass('current');
        $current = $prev;
        bindTransitionEnd();
      }
    }
  };
  const toggleCtrl = function() {
    const $ctrl = $('#controller');
    if ($ctrl.hasClass('hide')) {
      $ctrl.removeClass('hide');
    }
    else {
      $ctrl.addClass('hide');
    }
  };
  const clearCanvas = function() {
    const $currentCanvas = $current.children('.livePenCanvas');
    CanvasesController.clearCanvas($currentCanvas[0]);
  };

  // Mouse event handlers
  $('#prev-btn').on('click', slideRight);
  $('#next-btn').on('click', slideLeft);
  $('#fullscreen-btn').on('click', fullscreen.toggle);
  $('#togglectrl-btn').on('click', toggleCtrl);
  $('#clearcanvas-btn').on('click', clearCanvas);

  // Keyboard event handlers
  $('html').on('keydown', function(e) {
    // console.log(e.which);
    switch (e.which) {
      case 39: // right arrow
        slideLeft();
        break;
      case 37: // left arrow
        slideRight();
        break;
      case 67: // letter c
        clearCanvas();
        break;
      case 70: // letter f
        if (fullscreen.enabled()) {
          fullscreen.toggle();
        }
        break;
      case 72: // letter h
        toggleCtrl();
        break;
      default:
        return;
    }
    e.preventDefault();
  });

  // Other handlers bind
  $('#brushsize-sct').on('change', function() {
    canvasesController.setBrushSize($(this).val());
  });
  $('#brushcolor-ipt').on('change', function() {
    canvasesController.setBrushColor($(this).val());
  });
  $('.diapositive').on('resize', function() {
    const $this = $(this);
    const $canvas = $this.children('.livePenCanvas');
    $canvas.width($this.width());
    $canvas.height($this.height());
  });

});
