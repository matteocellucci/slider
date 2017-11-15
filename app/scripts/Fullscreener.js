class Fullscreener {
  static element() {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    return fullscreenElement;
  }

  static enabled() {
    const fullscreenEnabled =
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled;
    return fullscreenEnabled;
  }

  static open(target) {
    if (target.requestFullscreen) {
      target.requestFullscreen();
    }
    else if (target.webkitRequestFullscreen) {
      target.webkitRequestFullscreen();
    }
    else if (target.mozRequestFullScreen) {
      target.mozRequestFullScreen();
    }
    else if (target.msRequestFullscreen) {
      target.msRequestFullscreen;
    }
  }

  static close() {
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

  static toggle(target) {
    if (Fullscreener.element() == null) {
      Fullscreener.open(target);
    }
    else {
      Fullscreener.close();
    }
  }
}
