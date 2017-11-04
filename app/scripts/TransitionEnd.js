class TransitionEnd {
  static which() {
    TransitionEnd.__which = undefined;
    const el = document.createElement('fakeelement');
    const transitions = {
      'transition'      : 'transitionend',
      'OTransition'     : 'oTransitionEnd',
      'MozTransition'   : 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (let t in transitions) {
      if (el.style[t] !== undefined) {
        TransitionEnd.__which = transitions[t];
        return transitions[t];
      }
    }
  }

  static bind(elem, listener) {
    if (TransitionEnd.__which) {
      elem.addEventListener(
        TransitionEnd.__which,
        listener
      );
    }
    else {
      TransitionEnd.which();
      TransitionEnd.bind(elem, listener);
    }
  }

  static unbind(elem, listener) {
    if (TransitionEnd.__which) {
      elem.removeEventListener(
        TransitionEnd.__which,
        listener
      );
    }
    else {
      TransitionEnd.which();
      TransitionEnd.unbind(elem, listener);
    }
  }
  
  static one(elem, listener) {
    const wallCallback = function() {
      listener();
      TransitionEnd.unbind(elem, wallCallback);
    };
    TransitionEnd.bind(elem, wallCallback);
  }
} 
