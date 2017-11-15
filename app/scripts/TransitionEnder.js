class TransitionEnder {
  static getEventName() {
    if (!TransitionEnder.eventName) {
      TransitionEnder.setEventName();
    }
    return TransitionEnder.eventName;
  }
    
  static setEventName() { 
    const div = document.createElement('div');
    const events = {
      'transition'      : 'transitionend',
      'OTransition'     : 'oTransitionEnd',
      'MozTransition'   : 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (let e in events) {
      if (div.style[e] !== undefined) {
        TransitionEnder.eventName = events[e];
      }
    }
  }
  
  static bindTo(elem, listener) {
    elem.addEventListener(
      TransitionEnder.getEventName(),
      listener
    );
  }

  static unbindFrom(elem, listener) {
    elem.removeEventListener(
      TransitionEnder.getEventName(),
      listener
    );
  }
  
  static one(elem, listener) {
    const wallCallback = function() {
      listener();
      TransitionEnder.unbindFrom(elem, wallCallback);
    };
    TransitionEnder.bindTo(elem, wallCallback);
  }
} 
