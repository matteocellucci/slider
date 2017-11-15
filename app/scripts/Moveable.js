class Moveable extends Showable {
  constructor(element) {
    super(element);

    let gapX = 0;
    let gapY = 0;
    let mouseDown = false;

    element.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        const frame = element.getBoundingClientRect();
        gapX = e.pageX - frame.left;
        gapY = e.pageY - frame.top;
        if (gapY < 10) { // click on title bar of the window
          mouseDown = true;
        }
      }
    });

    element.addEventListener('mouseup', (e) => {
      if (e.which === 1) {
        mouseDown = false;
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (mouseDown) {
        const frame = element.getBoundingClientRect();
        element.style.top = (e.pageY - gapY) + 'px';
        element.style.left = (e.pageX - gapX) + 'px';
      }
    });
  }
}
