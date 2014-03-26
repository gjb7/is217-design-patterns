var DatabaseConnectionFactory = require('./../lib/DatabaseConnectionFactory'),
	MySQLDatabaseConnectionAdapter = require('./../lib/db/MySQL/MySQLDatabaseConnectionAdapter'),
	chai = require('chai'),
	expect = chai.expect;

describe('DatabaseConnectionFactory', function() {
	describe('#make', function() {
		it('should create a new database connection', function() {
			var connection = DatabaseConnectionFactory.getInstance().make(MySQLDatabaseConnectionAdapter.identifier, ['mysql://localhost']);
			
			expect(connection).to.be.instanceof(MySQLDatabaseConnectionAdapter);
		});
	});
});