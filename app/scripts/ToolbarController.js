class ToolbarController {
  constructor(id) {
    this.frame = document.getElementById(id);
    this.buttons = {};

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setting = this.setting.bind(this);
    this.check = this.check.bind(this);
    this.uncheck = this.uncheck.bind(this);
    this.reverse = this.reverse.bind(this);
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

  setting(settingId, listener) {
    this.buttons[settingId] = document.getElementById(settingId);
    this.buttons[settingId].addEventListener('change', listener);
  }

  check(settingId) {
    this.buttons[settingId].checked = true;
  }

  uncheck(settingId) {
    this.buttons[settingId].checked = false;
  }

  reverse(settingId) {
    this.buttons[settingId].checked = !this.buttons[settingId].checked;
  }
}
