'use strict';

let Classifier = (state) => {
  const noHtmlWhitespaceExp = /[^\x20\t\r\n\f]+/g;
  
  let classes = [];
  if (state && state.domRef && state.domRef.hasAttribute && state.domRef.hasAttribute('class')) {
    classes = state.domRef.getAttribute('class').match(noHtmlWhitespaceExp);
  }
  
  return {
    hasClass (className) {
      const strippedName = className.match(noHtmlWhitespaceExp)[0];
      return classes.includes(strippedName);
    },
    addClass (classesNames) {
      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      for (let i = 0, len = strippedNames.length; i < len; i++) {
        if (classes.indexOf(strippedNames[i]) < 0) {
          classes.push(strippedNames[i]);
        }
      }
      state.domRef.setAttribute('class', classes.join(' '));
      return this;
    },
    removeClass (classesNames) {
      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      for (let i = 0, len1 = strippedNames.length; i < len1; i++) {
        let j = classes.indexOf(strippedNames[i]);
        while (j >= 0) {
          classes.splice(j, 1);
          j = classes.indexOf(strippedNames[i]);
        }
      }
      state.domRef.setAttribute('class', classes.join(' '));
      return this;
    },
    toggleClass (classesNames) {
      const strippedNames = classesNames.match(noHtmlWhitespaceExp);
      for (let i = 0, len1 = strippedNames.length; i < len1; i++) {
        let j = classes.indexOf(strippedNames[i]);
        if (j >= 0) {
          do {
            classes.splice(j, 1);
            j = classes.indexOf(strippedNames[i]);
          } while (j >= 0);
        }
        else {
          classes.push(strippedNames[i]);
        }
      }
      state.domRef.setAttribute('class', classes.join(' '));
      return this;
    }
  };
};
