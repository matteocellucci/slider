jQuery(function($) {
  // Objects
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
  const nextSlide = function() {
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
  const prevSlide = function() {
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
  const toggleToolbar = function() {
    $('#toolbar').toggleClass('show');
  };
  
  // Mouse event handlers
  $('#menu-btn').on('click', toggleToolbar);
  $('#prev-btn').on('click', prevSlide);
  $('#next-btn').on('click', nextSlide);

  // Keyboard event handlers
  $('html').on('keydown', function(e) {
    // console.log(e.which);
    switch (e.which) {
      case 39: // right arrow
        nextSlide();
        break;
      case 37: // left arrow
        prevSlide();
        break;
      default:
        return;
    }
    e.preventDefault();
  });

});
