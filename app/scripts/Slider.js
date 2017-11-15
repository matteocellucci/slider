class Slider {
  constructor(element) {
    this.domElement = element;
    this.diaps = this.domElement.getElementsByClassName('diapositive');
    this.current = 0;
          
    Slider.transitionStatus = false;
    TransitionEnder.one(this.diaps[0], () => Slider.transitionStatus = false);
  }

  prev() {
    if (!Slider.transitionStatus && this.current > 0) {
      const curr = new Classable(this.diaps[this.current]);
      const prev = new Classable(this.diaps[this.current - 1]);

      TransitionEnder.one(this.diaps[this.current], () => Slider.transitionStatus = false);
      Slider.transitionStatus = true;
      this.current--;
      
      curr.removeClass('current');
      prev.removeClass('prev');
      prev.addClass('current');
    }
  }

  next() {
    if (!Slider.transitionStatus && this.current < this.diaps.length - 1) {
      const curr = new Classable(this.diaps[this.current]);
      const next = new Classable(this.diaps[this.current + 1]);
      
      TransitionEnder.one(this.diaps[this.current], () => Slider.transitionStatus = false);
      Slider.transitionStatus = true;
      this.current++;
     
      curr.removeClass('current');
      curr.addClass('prev');
      next.addClass('current');
    }
  }
}
