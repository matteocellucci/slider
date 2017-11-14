class Toolbar extends Showable {
  constructor(element) {
    super(element);
    this.utilities = {};
  }

  addUtility(name, triggerer, listener) {
    this.utilities[name] = triggerer;
    this.utilities[name].onchange = () => listener();
  }

  active(name) {
    this.utilities[name].checked = true;
    this.utilities[name].onchange();
  }

  close(name){
    this.utilities[name].checked = false;
    this.utilities[name].onchange();
  }
}
