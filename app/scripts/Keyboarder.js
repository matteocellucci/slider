class Keyboarder {
  static init() {
    window.addEventListener('keydown', (e) => {
      // console.log(e.key);
      const action = Keyboarder.binds[e.key];
      if (action) {
        action();
      }
      e.preventDefault();
    });
  }

  static bind(key, listener) {
    const temporaryBind = {};
    temporaryBind[key] = listener;
    
    Keyboarder.binds = Object.assign(
      Keyboarder.binds || {},
      temporaryBind
    );
  }
}
