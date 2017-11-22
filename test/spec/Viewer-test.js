(function () {
  'use strict';

  describe('Viewer', function () {
    describe('when adding viewer behavior', function () {
      it('should add showUi behavior', function () {
        const viewer = Object.assign({}, Viewer());
        expect(viewer.showUi).to.exist;
      });
      
      it('should add hideUi behavior', function () {
        const viewer = Object.assign({}, Viewer());
        expect(viewer.hideUi).to.exist;
      });
      
      it('should add toggleUi behavior', function () {
        const viewer = Object.assign({}, Viewer());
        expect(viewer.toggleUi).to.exist;
      });
      
      it('should extend the object and do not transform it', function () {
        const state = document.createElement('test');
        const viewer = Object.assign(state, Viewer(state));
        expect(viewer.tagName).to.equal('TEST');
      });
    });
    
    describe('#showUi', function () {
    });
  });
})();
