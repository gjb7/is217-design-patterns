var DatabaseConnectionFactory = require('./../lib/DatabaseConnectionFactory'),
	MySQLDatabaseConnection = require('./../lib/db/MySQL/MySQLDatabaseConnection'),
	chai = require('chai'),
	expect = chai.expect;

describe('DatabaseConnectionFactory (Factory)', function() {
	describe('#make', function() {
		it('should create a new database connection', function() {
			var connection = DatabaseConnectionFactory.getInstance().make(MySQLDatabaseConnection.identifier, ['mysql://localhost']);
			
			expect(connection).to.be.instanceof(MySQLDatabaseConnection);
		});
	});
});