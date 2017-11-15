class TransitionEnd {
  static getEventName() {
    if (!TransitionEnd.eventName) {
      TransitionEnd.setEventName();
    }
    return TransitionEnd.eventName;
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
        TransitionEnd.eventName = events[e];
      }
    }
  }
  
  static bindTo(elem, listener) {
    elem.addEventListener(
      TransitionEnd.getEventName(),
      listener
    );
  }

  static unbindFrom(elem, listener) {
    elem.removeEventListener(
      TransitionEnd.getEventName(),
      listener
    );
  }
  
  static one(elem, listener) {
    const wallCallback = function() {
      listener();
      TransitionEnd.unbindFrom(elem, wallCallback);
    };
    TransitionEnd.bindTo(elem, wallCallback);
  }
} 
