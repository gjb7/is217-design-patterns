var NotificationCenter = require('./../lib/NotificationCenter'),
	chai = require('chai'),
	expect = chai.expect;

var observer = function() { };

describe('NotificationCenter (Observer)', function() {
	describe('#addObserver', function() {
		it('should add an observer', function() {
			NotificationCenter.getInstance().addObserver('event', observer);
			
			expect(NotificationCenter.getInstance().observers).to.have.keys('event');
			expect(NotificationCenter.getInstance().observers.event).to.have.length(1);
		});
	});
	
	describe('#removeObserver', function() {
		it('should remove an observer', function() {
			NotificationCenter.getInstance().removeObserver('event', observer);
			
			expect(NotificationCenter.getInstance().observers).to.have.keys('event');
			expect(NotificationCenter.getInstance().observers.event).to.have.length(0);
		});
	});
	
	describe('#post', function() {
		it('should post a notification', function(done) {
			NotificationCenter.getInstance().addObserver('something', function() {
				done();
			});
			
			NotificationCenter.getInstance().post('something', this);
		});
	});
});