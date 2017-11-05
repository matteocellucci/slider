class ToolWindow {
  constructor(id) {
    this.frame = document.getElementById(id);
    this.eventInfo = {
      gapX: 0,
      gapY: 0,
      mouseDown: false
    };

    this.downListener = this.downListener.bind(this);
    this.upListener = this.upListener.bind(this);
    this.moveListener = this.moveListener.bind(this);
    
    this.frame.addEventListener('mousedown', this.downListener);
    this.frame.addEventListener('mouseup', this.upListener);
    window.addEventListener('mousemove', this.moveListener); 
  }

  downListener(e) {
    let frameInfo;

    if (e.which === 1) {
      frameInfo = this.frame.getBoundingClientRect();
      this.eventInfo.gapX = e.pageX - frameInfo.left;
      this.eventInfo.gapY = e.pageY - frameInfo.top;
      if (this.eventInfo.gapY < 10) {
        this.eventInfo.mouseDown = true;
      }
    }
  }

  upListener(e) {
    if (e.which === 1) {
      this.eventInfo.mouseDown = false;
    }
  }

  moveListener(e) {
    let frameInfo;

    if (this.eventInfo.mouseDown) {
      frameInfo = this.frame.getBoundingClientRect();
      this.frame.style.top = (e.pageY - this.eventInfo.gapY) + 'px';
      this.frame.style.left = (e.pageX - this.eventInfo.gapX) + 'px';
    }
  }

  toggle() {
    let classes = this.frame.getAttribute('class');
    if (classes && classes.match(/\s+show\s+/)) {
      classes = classes.split(/\s+show\s+/).join(' ');
    }
    else {
      classes += ' show ';
    }
    this.frame.setAttribute('class', classes);
  }
}
