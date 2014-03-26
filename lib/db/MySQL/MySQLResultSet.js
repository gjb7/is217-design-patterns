function MySQLResultSet(rows) {
	this._rows = rows || [];
}

Object.defineProperty(MySQLResultSet.prototype, 'length', {
	enumerable: true,
	get: function() {
		return this._rows.length;
	}
});

MySQLResultSet.prototype.row = function(i) {
	return this._rows[i];
}

MySQLResultSet.prototype.each = function(callback) {
	this._rows.forEach(callback);
};

module.exports = MySQLResultSet;