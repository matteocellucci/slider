class Windowable extends Moveable {
  constructor(element) {
    super(element);
    this.buttons = {};
    this.settings = {};
  }

  addButton(name, triggerer, listener) {
    this.buttons[name] = triggerer;
    this.buttons[name].onclick = listener;
  }

  addSetting(name, triggerer, listener) {
    this.settings[name] = triggerer;
    this.settings[name].onchange = listener;
  }

  selectSetting(name) {
    this.settings[name].checked = true;
    this.settings[name].onchange();
  }

  unselectSetting(name) {
    this.settings[name].checked = false;
    this.settings[name].onchange();
  }
}
