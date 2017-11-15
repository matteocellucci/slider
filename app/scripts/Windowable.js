class Windowable extends Movable {
  constructor(element) {
    super(element);
    this.buttons = {};
    this.settings = {};
  }

  addButton(name, element, listener) {
    this.buttons[name] = element;
    this.buttons[name].onclick = listener;
  }

  addSetting(name, element, listener) {
    this.settings[name] = element;
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
