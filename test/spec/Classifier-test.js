(function() {
  'use strict';

  describe('Classifier', function() {
    describe('when adding classifier behavior', function() {
      it('should add hasClass behavior', function() {
        const classifier = Object.assign({}, Classifier());
        expect(classifier.hasClass).to.exist;
      });

      it('should add addClass behavior', function() {
        const classifier = Object.assign({}, Classifier());
        expect(classifier.addClass).to.exist;
      });

      it('should add removeClass behavior', function() {
        const classifier = Object.assign({}, Classifier());
        expect(classifier.removeClass).to.exist;
      });

      it('should add toggleClass behavior', function() {
        const classifier = Object.assign({}, Classifier());
        expect(classifier.toggleClass).to.exist;
      });
      
      it('should extend and do not transform the object', function() {
        const state = document.createElement('test');
        const classifier = Object.assign(state, Classifier(state));
        expect(classifier.tagName).to.equal('TEST');
      });
    });
    
    describe('#hasClass', function() {
      it('should check the existence of passed class', function() {
        let state = {};
        let classifier = Object.assign(state, Classifier());
        expect(classifier.hasClass('test1')).to.equal(false);
        
        state = document.createElement('test');
        classifier = Object.assign(state, Classifier(state));
        expect(classifier.hasClass('test1')).to.equal(false);

        state.setAttribute('class', 'test1');
        expect(classifier.hasClass('test1')).to.equal(true);

        state.setAttribute('class', 'test1 test2');
        expect(classifier.hasClass('test1')).to.equal(true);
      });
      
      it('should succeed if all passed classes exist', function() {
        let state = document.createElement('test')
        let classifier = Object.assign(state, Classifier(state));
        
        state.setAttribute('class', 'test1 test2 test3');
        expect(classifier.hasClass('test4 test5')).to.equal(false);
        expect(classifier.hasClass('test4 test1')).to.equal(false);
        expect(classifier.hasClass('test1 test4')).to.equal(false);
        expect(classifier.hasClass('test2 test1')).to.equal(true);
        expect(classifier.hasClass('test1 test2')).to.equal(true);
        expect(classifier.hasClass('test1 test2 test3')).to.equal(true);
        expect(classifier.hasClass('test1 test1 test2')).to.equal(true);
        expect(classifier.hasClass('test1 test2 test3 test4')).to.equal(false);
        
        expect(classifier.hasClass('')).to.equal(false);
        expect(classifier.hasClass()).to.equal(false);
      });

      it('should ignore all html whitespace', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        state.setAttribute('class', '  \t\rtest1  \ntest2   test3    ');
        expect(classifier.hasClass('test1')).to.equal(true);
        expect(classifier.hasClass(' \t test1 \t  \r   ')).to.equal(true);
        expect(classifier.hasClass('test4')).to.equal(false);
        expect(classifier.hasClass(' \t test4 \t  \r   ')).to.equal(false);
        expect(classifier.hasClass('test4 test1')).to.equal(false);
        expect(classifier.hasClass(' \t test1 \t  \rtest4   ')).to.equal(false);
        expect(classifier.hasClass('test2 test1')).to.equal(true);
        expect(classifier.hasClass(' \t test1 \t   test2  \r   ')).to.equal(true);
        
        state.setAttribute('class', 'test1 test2 test3');
        expect(classifier.hasClass(' \t test1 \t  \r   ')).to.equal(true);
        expect(classifier.hasClass(' \t test4 \t  \r   ')).to.equal(false);
        expect(classifier.hasClass(' \t test1 \t  \rtest4   ')).to.equal(false);
        expect(classifier.hasClass(' \t test1 \t   test2  \r   ')).to.equal(true);
        
        expect(classifier.hasClass(' \t \n     \r   ')).to.equal(false);
      });
    });

    describe('#addClass', function() {
      it('should append passed classes to the existing ones', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        classifier.addClass('test1');
        expect(state.getAttribute('class')).to.equal('test1');
        
        classifier.addClass('test2');
        expect(state.getAttribute('class')).to.equal('test1 test2');
        
        classifier.addClass('test3 test4');
        expect(state.getAttribute('class')).to.equal('test1 test2 test3 test4');
        
        classifier.addClass('');
        expect(state.getAttribute('class')).to.equal('test1 test2 test3 test4');
        
        classifier.addClass();
        expect(state.getAttribute('class')).to.equal('test1 test2 test3 test4');
      });

      it('should ignore all html whitespace', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        classifier.addClass('\r\n  \rtest1   \t');
        expect(state.getAttribute('class')).to.equal('test1');
        
        classifier.addClass('\r   \ntest2');
        expect(state.getAttribute('class')).to.equal('test1 test2');
        
        classifier.addClass('\rtest3      \ttest4\n');
        expect(state.getAttribute('class')).to.equal('test1 test2 test3 test4');
        
        classifier.addClass('   \r  \t\n');
        expect(state.getAttribute('class')).to.equal('test1 test2 test3 test4');
      });

      it('should ignore already existing class', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        classifier.addClass('test1 test1');
        expect(state.getAttribute('class')).to.equal('test1');
        
        classifier.addClass('test2 test1');
        expect(state.getAttribute('class')).to.equal('test1 test2');
        
        classifier.addClass('test2 test3 test4 test2');
        expect(state.getAttribute('class')).to.equal('test1 test2 test3 test4');
      });
    });
    
    describe('#removeClass', function() {
      it('should remove all occurences of all passed classes', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        state.setAttribute('class', 'test1 test2 test3 test4');
        classifier.removeClass('test1 test3');
        expect(state.getAttribute('class')).to.equal('test2 test4');

        classifier.removeClass('test2');
        expect(state.getAttribute('class')).to.equal('test4');
        
        classifier.removeClass('test1');
        expect(state.getAttribute('class')).to.equal('test4');

        classifier.removeClass('test4');
        expect(state.getAttribute('class')).to.equal('');
        
        classifier.removeClass('test1');
        expect(state.getAttribute('class')).to.equal('');
        
        state.setAttribute('class', 'test1 test2 test1 test3 test4 test4');
        classifier.removeClass('test1 test3');
        expect(state.getAttribute('class')).to.equal('test2 test4 test4');

        classifier.removeClass('');
        expect(state.getAttribute('class')).to.equal('test2 test4 test4');
        
        classifier.removeClass();
        expect(state.getAttribute('class')).to.equal('test2 test4 test4');
      });

      it('should ignore all html whitespace', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        state.setAttribute('class', '\rtest1  \ntest2  test3 \t\r\n   test2     \t  test1');
        classifier.removeClass('test1 test3');
        expect(state.getAttribute('class')).to.equal('test2 test2');
        
        state.setAttribute('class', '\rtest1  \ntest2  test3 \t\r\n   test2     \t  test1');
        classifier.removeClass('\n\t\n  test1 \r  test2  ');
        expect(state.getAttribute('class')).to.equal('test3');

        state.setAttribute('class', '\rtest1  \ntest2  \t\r\n   test3     \t  test1');
        classifier.removeClass('\r\n   test2   test4');
        expect(state.getAttribute('class')).to.equal('test1 test3 test1');
        
        classifier.removeClass('\r\n   \t');
        expect(state.getAttribute('class')).to.equal('test1 test3 test1');
      });
    });

    describe('#toggleClass', function() {
      it('should toggle all occurences of all passed classes', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        state.setAttribute('class', 'test1 test2 test3');
        classifier.toggleClass('test3 test1 test4');
        expect(state.getAttribute('class')).to.equal('test2 test4');
        
        classifier.toggleClass('test3 test1 test4');
        expect(state.getAttribute('class')).to.equal('test2 test3 test1');

        classifier.toggleClass('test3 test1 test2');
        expect(state.getAttribute('class')).to.equal('');
        
        classifier.toggleClass('test3');
        expect(state.getAttribute('class')).to.equal('test3');
        
        classifier.toggleClass('');
        expect(state.getAttribute('class')).to.equal('test3');
        
        classifier.toggleClass();
        expect(state.getAttribute('class')).to.equal('test3');

        state.setAttribute('class', 'test1 test2 test1 test3 test4 test3 test1');
        classifier.toggleClass('test3 test5 test1');
        expect(state.getAttribute('class')).to.equal('test2 test4 test5');
      });

      it('should ignore all html whitespace', function() {
        let state = document.createElement('test');
        let classifier = Object.assign(state, Classifier(state));
        
        state.setAttribute('class', '\rtest1  \n     \t  test2 test3 \ttest2\n');
        classifier.toggleClass('test1 \t\n test4');
        expect(state.getAttribute('class')).to.equal('test2 test3 test2 test4');
        
        classifier.toggleClass('\t   test2 \t\n test4');
        expect(state.getAttribute('class')).to.equal('test3');
        
        classifier.toggleClass('\t\n   \r   ');
        expect(state.getAttribute('class')).to.equal('test3');
      });
    });
  });
})();
