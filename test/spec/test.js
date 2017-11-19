(function () {
  'use strict';
  describe('Classifier', function () {
    describe('when adding classifier behavior', function () {
      it('should add hasClass behavior', function () {
        const classifier = Object.assign(
          {},
          Classifier({})
        );
        expect(classifier.hasClass).to.exist;
      });

      it('should add addClass behavior', function () {
        const classifier = Object.assign(
          {},
          Classifier({})
        );
        expect(classifier.addClass).to.exist;
      });

      it('should add removeClass behavior', function () {
        const classifier = Object.assign(
          {},
          Classifier({})
        );
        expect(classifier.removeClass).to.exist;
      });

      it('should add toggleClass behavior', function () {
        const classifier = Object.assign(
          {},
          Classifier({})
        );
        expect(classifier.toggleClass).to.exist;
      });
    });

    describe('#hasClass', function () {
      it('should check the existence of passed class', function () {
        const classifier = Object.assign(
          {},
          Classifier({})
        );
        expect(classifier.hasClass('test')).to.equal(false);
      });

      it('should ignore all html whitespace', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', '  \t\rhello  \nworld   test    ');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        expect(classifier.hasClass('test')).to.equal(true);
        expect(classifier.hasClass(' \t test \t  \r   ')).to.equal(true);
      });

      it('should ignore all classes except first one in passed class', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'test');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        expect(classifier.hasClass('hello test')).to.equal(false);
        expect(classifier.hasClass('test hello')).to.equal(true);
      });
    });

    describe('#addClass', function () {
      it('should append all provided classes', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'hello world');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.addClass('test1');
        expect(state.domRef.getAttribute('class')).to.equal('hello world test1');
        classifier.addClass('test2 test3');
        expect(state.domRef.getAttribute('class')).to.equal('hello world test1 test2 test3');
      });

      it('should ignore all html whitespace', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', '\rhello \nworld    \t');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.addClass('test1 \t\n   test2');
        expect(state.domRef.getAttribute('class')).to.equal('hello world test1 test2');
      });

      it('should ignore already existing class', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'hello world');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.addClass('hello test');
        expect(state.domRef.getAttribute('class')).to.equal('hello world test');
      });

      it('should be chainable', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        expect(classifier.addClass('hello world')).to.equal(classifier);
      });
    });
    
    describe('#removeClass', function () {
      it('should remove all provided classes', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'hello world test1 test2');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.removeClass('test1 world');
        expect(state.domRef.getAttribute('class')).to.equal('hello test2');
        classifier.removeClass('test2');
        expect(state.domRef.getAttribute('class')).to.equal('hello');
      });
      
      it('should remove multiple occurence of provided classes', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'world hello world test1 test2 test2');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.removeClass('test1 world');
        expect(state.domRef.getAttribute('class')).to.equal('hello test2 test2');
        classifier.removeClass('test2');
        expect(state.domRef.getAttribute('class')).to.equal('hello');
      });

      it('should ignore all html whitespace', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', '\rhello  \nworld     \t  test1');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.removeClass('test1 \t\n world');
        expect(state.domRef.getAttribute('class')).to.equal('hello');
      });

      it('should be chainable', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        expect(classifier.removeClass('test')).to.equal(classifier);
      });
    });

    describe('#toggleClass', function () {
      it('should toggle provided classes', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'hello test1 test2');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.toggleClass('test1 test2 world');
        expect(state.domRef.getAttribute('class')).to.equal('hello world');
      });
      
      it('should toggle all occurence of provided classes', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', 'hello test1 test2 test1');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.toggleClass('test1 test2 world');
        expect(state.domRef.getAttribute('class')).to.equal('hello world');
      });

      it('should ignore all html whitespace', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        state.domRef.setAttribute('class', '\rhello  \n     \t  test1');
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        classifier.toggleClass('test1 \t\n world');
        expect(state.domRef.getAttribute('class')).to.equal('hello world');
      });

      it('should be chainable', function () {
        const state = {
          domRef: document.createElement('testelement')
        };
        const classifier = Object.assign(
          {},
          Classifier(state)
        );
        expect(classifier.toggleClass('test')).to.equal(classifier);
      });
    });
  });
})();
