jQuery(function($) {
  // Objects
  const fullscreen = new FullscreenController(document.documentElement);
  let $current = $('.diapositive.current');

  // Functions
  const slideLeft = function() {
    const $next = $current.next();
    if ($next.length > 0) {
      $current.removeClass('current').addClass('prev');
      $next.addClass('current');
      $current = $next;
    }
  };
  const slideRight = function() {
    const $prev = $current.prev();
    if ($prev.length > 0) {
      $current.removeClass('current');
      $prev.removeClass('prev').addClass('current');
      $current = $prev;
    }
  };

  // Event handlers
  $('#prev-btn').on('click', slideRight);
  $('#next-btn').on('click', slideLeft);
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
