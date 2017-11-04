class Toolbar {
  constructor(id) {
    this.frame = document.getElementById(id);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  show() {
    let classes = this.frame.getAttribute('class');
    if (!classes || !classes.match(/\s+show\s+/)) {
      classes += ' show ';
      this.frame.setAttribute('class', classes);
    }
  }

  hide() {
    let classes = this.frame.getAttribute('class');
    if (classes && classes.match(/\s+show\s+/)) {
      classes = classes.split(/\s+show\s+/).join(" ");
      this.frame.setAttribute('class', classes);
    }
  }

  toggle() {
    let classes = this.frame.getAttribute('class');
    if (classes && classes.match(/\s+show\s+/)) {
      classes = classes.split(/\s+show\s+/).join(" ");
    }
    else {
      if (!classes) {
        classes = ' show ';
      }
      else {
        classes += ' show ';
      }
    }
    this.frame.setAttribute('class', classes);
  }
}
