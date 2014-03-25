var MySQLQueryBuilder = function() {
	this.query = '';
};

MySQLQueryBuilder.prototype.buildQuery = function() {
	throw new Error('Subclasses should override this method.');
};

MySQLQueryBuilder.prototype.append = function(string) {
	this.query += string;
};

MySQLQueryBuilder.prototype.toString = function() {
	if (!this.query) {
		this.buildQuery();
	}
	
	return this.query;
};

module.exports = MySQLQueryBuilder;