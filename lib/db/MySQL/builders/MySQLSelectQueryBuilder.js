var MySQLQueryBuilder = require('./MySQLQueryBuilder');

function MySQLSelectQueryBuilder(table, columns) {
	MySQLQueryBuilder.call(this);
	
	this._table = table;
	this._columns = columns || ['*'];
	this._where = '';
	this._limit = -1;
	this._count = -1;
};

MySQLSelectQueryBuilder.queryMethods = ['where', 'limit'];

MySQLSelectQueryBuilder.prototype = new MySQLQueryBuilder();
MySQLSelectQueryBuilder.prototype.constructor = MySQLSelectQueryBuilder;

MySQLSelectQueryBuilder.prototype.where = function(where) {
	this._where = where;
	
	return this;
}

MySQLSelectQueryBuilder.prototype.limit = function(limit, count) {
	this._limit = limit;
	this._count = count || -1;
	
	return this;
}

MySQLSelectQueryBuilder.prototype.buildQuery = function() {
	this.append('SELECT ' + this._columns.join(', ') + ' FROM ' + this._table);
	
	if (this._where) {
		this.append(' WHERE ' + this._where);
	}
	
	if (this._limit > 0) {
		this.append(' LIMIT ' + this._limit);
		
		if (this._count > 0) {
			this.append(', ' + this._count);
		}
	}
};

module.exports = MySQLSelectQueryBuilder;