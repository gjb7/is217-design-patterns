// This mocks a connection to a MySQL database. To keep things simple, there is no actual connection to a MySQL database.
// Code to demonstrate what interacting with MySQL would look like has been included, but commented out.

var MySQLQueryBuilder = require('./builders/MySQLQueryBuilder');

function MySQLQuery(queryOrBuilder, connection) {
	this.connection = connection;
	
	if (queryOrBuilder instanceof MySQLQueryBuilder) {
		this.builder = queryOrBuilder;
		this._populateMethods();
	}
	else {
		this.query = queryOrBuilder;
	}
};

MySQLQuery.prototype._populateMethods = function() {
	var self = this;
	this.builder.constructor.queryMethods.forEach(function(method) {
		self[method] = function() {
			self.builder[method].call(self.builder, arguments);
			
			return self;
		};
	});
};

MySQLQuery.prototype.execute = function(callback) {
	if (!this.query) {
		this.query = this.builder.toString();
	}
	
	// this.connection.query(this.query, callback);
	process.nextTick(function() {
		callback([
			{ id: 1, username: 'legosjedi' }
		]);
	});
};

module.exports = MySQLQuery;