var Application = require('./../lib/Application'),
	chai = require('chai'),
	expect = chai.expect;

describe('Application (Singleton)', function() {
	describe('constructor', function() {
		it('should throw an Error', function() {
			expect(Application).to.throw(Error);
		});
	});
	
	describe('.getInstance', function() {
		it('should return the same instance', function() {
			expect(Application.getInstance()).to.be.an.instanceof(Application);
			expect(Application.getInstance()).to.equal(Application.getInstance());
		});
	});
});