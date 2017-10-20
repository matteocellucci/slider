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
