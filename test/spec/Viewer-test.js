(function () {
  'use strict';

  describe('Viewer', function () {
    describe('when adding viewer behavior', function () {
      it('should add showUi behavior', function () {
        const viewer = Object.assign(
          {},
          Viewer({})
        );
        expect(viewer.showUi).to.exist;
      });
      
      it('should add hideUi behavior', function () {
        const viewer = Object.assign(
          {},
          Viewer({})
        );
        expect(viewer.hideUi).to.exist;
      });
      
      it('should add toggleUi behavior', function () {
        const viewer = Object.assign(
          {},
          Viewer({})
        );
        expect(viewer.toggleUi).to.exist;
      });
    });
    
    describe('#showUi', function () {
    });
  });
})();
