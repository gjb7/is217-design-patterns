var MySQLSelectQueryBuilder = require('./../lib/db/MySQL/builders/MySQLSelectQueryBuilder'),
	chai = require('chai'),
	expect = chai.expect;

describe('MySQLSelectQueryBuilder (Builder)', function() {
	it('should create a query', function() {
		var builder = new MySQLSelectQueryBuilder('users');
		builder.where('uid = 1').limit(1);
		
		expect(builder.toString()).to.equal('SELECT * FROM users WHERE uid = 1 LIMIT 1');
	});
});