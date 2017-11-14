class Showable extends Classable {
  constructor(element) {
    super(element);
    this.className = 'show';
  }

  show() {
    super.safeAddClass(this.className);
  }

  hide() {
    super.safeRemoveClass(this.className);
  }

  toggle() {
    super.toggleClass(this.className);
  }
}
