class Classable {
  constructor(element) {
    this.domElement = element;
    this.classes = [];
    if (this.domElement.hasAttribute('class')) {
      const notHtmlWhiteExp = /[^\x20\t\r\n\f]+/g;
      this.classes = this.domElement.getAttribute('class').match(notHtmlWhiteExp);
    }
  }

  hasClass(className) {
    return this.classes.include(className);
  }

  addClass(className) {
    classes.push(className);
    this.domElement.setAttribute('class', this.classes.join(' '));
  }
  
  removeClass(className) {
    const i = this.classes.indexOf(className);
    while (i >= 0) {
      this.classes.splice(i, 1);
      i = this.classes.indexOf(className);
    }
    this.domElement.setAttribute('class', this.classes.join(' '));
  }

  safeAddClass(className) {
    if (!this.hasClass(className)) {
      this.addClass(className);
    }
  }

  safeRemoveClass(className) {
    if (this.hasClass(className)) {
      this.removeClass(className);
    }
  }

  toggleClass(className) {
    if(this.hasClass(className)) {
      this.removeClass(className);
    }
    else {
      this.addClass(className);
    }
  }
}
