jQuery(function($) {
  // Objects
  const fullscreen = new FullscreenController(document.documentElement);
  let $current = $('.diapositive.current');
  let isTransitionEnd = true;

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

  // Mouse event handlers
  $('#prev-btn').on('click', slideRight);
  $('#next-btn').on('click', slideLeft);
  $('#fullscreen-btn').on('click', fullscreen.toggle);

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
      case 70: // letter f
        if (fullscreen.enabled()) {
          fullscreen.toggle();
        }
        break;
      default:
        return;
    }
    e.preventDefault();
  });
});
