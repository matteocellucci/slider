class Slider {
  constructor(conteinerId) {
    Slider.transitionStatus = false;
   
    this.frame = document.getElementById(conteinerId);
    this.diaps = this.frame.getElementsByClassName('diapositive');
    this.current = 0;
          
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    
    //TransitionEnd.one(this.diaps[0], () => Slider.transitionStatus = false);
  }

  prev() {
    let curr, prev, currClass, prevClass;
    
    if (!Slider.transitionStatus && this.current > 0) {
      curr = this.diaps[this.current];
      prev = this.diaps[this.current - 1];
      currClass = curr.getAttribute('class').split(/\s+current\s+/).join(" ");
      prevClass = prev.getAttribute('class').split(/\s+prev\s+/).join(" ") + ' current ';
      
      TransitionEnd.one(curr, () => Slider.transitionStatus = false);
      Slider.transitionStatus = true;
      this.current--;
      
      curr.setAttribute('class', currClass);
      prev.setAttribute('class', prevClass);
    }
  }

  next() {
    let curr, next, currClass, nextClass;
    
    if (!Slider.transitionStatus && this.current < this.diaps.length - 1) {
      curr = this.diaps[this.current];
      next = this.diaps[this.current + 1];
      currClass = curr.getAttribute('class').split(/\s+current\s+/).join(" ") + ' prev ';
      nextClass = next.getAttribute('class') + ' current ';
      
      TransitionEnd.one(curr, () => Slider.transitionStatus = false);
      Slider.transitionStatus = true;
      this.current++;
      
      curr.setAttribute('class', currClass);
      next.setAttribute('class', nextClass);
    }
  }
}
