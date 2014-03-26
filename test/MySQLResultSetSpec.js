var MySQLResultSet = require('./../lib/db/MySQL/MySQLResultSet'),
	chai = require('chai'),
	expect = chai.expect;

describe('MySQLResultSet (Iterator)', function() {
	describe('#length', function() {
		it('should return the right length', function() {
			var resultSet = new MySQLResultSet([
				{ id: 1, username: 'legosjedi' },
				{ id: 2, username: 'grantjbutler' }
			]);
			
			expect(resultSet.length).to.equal(2);
		});
	});
	
	describe('#row()', function() {
		it('should return a row at the specified index', function() {
			var resultSet = new MySQLResultSet([
				{ id: 1, username: 'legosjedi' },
				{ id: 2, username: 'grantjbutler' }
			]);
			
			expect(resultSet.row(0)).to.deep.equal(resultSet._rows[0]);
		});
	});
	
	describe('#each()', function() {
		it('should iterate over all the rows', function() {
			var resultSet = new MySQLResultSet([
				{ id: 1, username: 'legosjedi' },
				{ id: 2, username: 'grantjbutler' }
			]);
			
			var count = resultSet.length;
			
			resultSet.each(function(row) {
				count--;
			});
			
			expect(count).to.equal(0);
		});
	});
});