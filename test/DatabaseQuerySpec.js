var DatabaseConnectionFactory = require('./../lib/DatabaseConnectionFactory'),
	MySQLDatabaseConnectionAdapter = require('./../lib/db/MySQL/MySQLDatabaseConnectionAdapter'),
	chai = require('chai'),
	expect = chai.expect;

describe('MySQLQuery (Decorator)', function() {
	it('should implement MySQLSelectQueryBuilder methods', function() {
		var connection = DatabaseConnectionFactory.getInstance().make(MySQLDatabaseConnectionAdapter.identifier, ['mysql://localhost']);
		var query = connection.select('users');
		
		expect(query).to.respondTo('where');
		expect(query).to.respondTo('limit');
	});
	
	it('should return results', function(done) {
		var connection = DatabaseConnectionFactory.getInstance().make(MySQLDatabaseConnectionAdapter.identifier, ['mysql://localhost']);
		connection.select('users', ['id', 'username']).where('uid = 1').limit(1).execute(function(rows) {
			expect(rows).to.have.length(1);
			expect(rows[0].id).to.equal(1);
			expect(rows[0].username).to.equal('legosjedi');
			
			done();
		});
	});
});