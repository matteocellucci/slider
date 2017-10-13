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
//  console.log(e.which);
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

class FullscreenController {
  constructor(target) {
    this.target = target;
  }

  element() {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    return fullscreenElement;
  }

  enabled() {
    const fullscreenEnabled =
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled;
    return fullscreenEnabled;
  }

  open() {
    if (this.target.requestFullscreen) {
      this.target.requestFullscreen();
    }
    else if (this.target.webkitRequestFullscreen) {
      this.target.webkitRequestFullscreen();
    }
    else if (this.target.mozRequestFullScreen) {
      this.target.mozRequestFullScreen();
    }
    else if (this.target.msRequestFullscreen) {
      this.target.msRequestFullscreen;
    }
  }

  close() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  toggle() {
    if (this.element() == null) {
      this.open();
    }
    else {
      this.close();
    }
  }
}
