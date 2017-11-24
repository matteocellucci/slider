class Toolbar {
  constructor(element) {
    this.utilities = {};
  }

  addUtility(name, triggerer, listener) {
    this.utilities[name] = triggerer;
    this.utilities[name].onchange = () => listener();
  }
  
  run(name) {
    this.utilities[name].checked = true;
    this.utilities[name].onchange();
  }

  kill(name){
    this.utilities[name].checked = false;
    this.utilities[name].onchange();
  }

  runKill(name) {
    if (this.utilities[name].checked) {
      this.kill(name);
    }
    else {
      this.run(name);
    }
  }
}
