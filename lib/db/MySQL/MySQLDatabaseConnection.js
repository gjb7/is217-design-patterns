// This mocks a connection to a MySQL database. To keep things simple, there is no actual connection to a MySQL database.
// Code to demonstrate what interacting with MySQL would look like has been included, but commented out.

var MySQLSelectQueryBuilder = require('./builders/MySQLSelectQueryBuilder'),
	MySQLQuery = require('./MySQLQuery');

function MySQLDatabaseConnection(connectURL) {
	// this.connection = mysql.connect(connectURL);
};

MySQLDatabaseConnection.identifier = 'MySQL';

MySQLDatabaseConnection.prototype.query = function(query) {
	return new MySQLQuery(query, this.connection);
}

MySQLDatabaseConnection.prototype.select = function(table, columns) {
	return new MySQLQuery(new MySQLSelectQueryBuilder(table, columns), this.connection);
};

module.exports = MySQLDatabaseConnection;