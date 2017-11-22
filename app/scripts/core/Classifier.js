'use strict';

let Classifier = (state) => {
  const noHtmlWhitespaceExp = /[^\x20\t\r\n\f]+/g;

  const classifierGetClass = () => {
    if (!state || !state.getAttribute || !state.getAttribute('class')) {
      return [];
    }
    return state.getAttribute('class').match(noHtmlWhitespaceExp);
  };

  const classifierSetClass = (classes) => {
    if (state && state.setAttribute) {
      state.setAttribute('class', classes.join(' '));
    }
  };

  return {
    hasClass (classesNames) {
      if (!classesNames || !classesNames.match(noHtmlWhitespaceExp)) {
        return false;
      }

      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      const classes = classifierGetClass();

      for (let i = 0, len = strippedNames.length; i < len; i++) {
        if (!classes.includes(strippedNames[i])) {
          return false;
        }
      }
      return true;
    },

    addClass (classesNames) {
      if (!classesNames || !classesNames.match(noHtmlWhitespaceExp)) {
        return false;
      }

      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      const classes = classifierGetClass();

      for (let i = 0, len = strippedNames.length; i < len; i++) {
        let name = strippedNames[i];
        if (!classes.includes(name)) {
          classes.push(name);
        }
      }
      classifierSetClass(classes);
    },

    removeClass (classesNames) {
      if (!classesNames || !classesNames.match(noHtmlWhitespaceExp)) {
        return false;
      }

      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      const classes = classifierGetClass();

      for (let i = 0, len = strippedNames.length; i < len; i++) {
        let name = strippedNames[i];
        let j = classes.indexOf(name);
        while (j >= 0) {
          classes.splice(j, 1);
          j = classes.indexOf(name);
        }
      }
      classifierSetClass(classes);
    },

    toggleClass (classesNames) {
      if (!classesNames || !classesNames.match(noHtmlWhitespaceExp)) {
        return false;
      }

      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      const classes = classifierGetClass();

      for (let i = 0, len = strippedNames.length; i < len; i++) {
        let name = strippedNames[i];
        let j = classes.indexOf(name);
        if (j < 0) {
          classes.push(name);
        }
        else {
          do {
            classes.splice(j, 1);
            j = classes.indexOf(name);
          } while (j >= 0);
        }
      }
      classifierSetClass(classes);
    }
  };
};
