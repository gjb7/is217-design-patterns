var fs = require('fs'),
	path = require('path');

var instance;	
var creatingInstance = false;

function DatabaseConnectionFactory() {
	if (!creatingInstance) {
		throw new Error("Cannot create new instance of singleton NotificationCenter.");
	}
	
	this.connections = {};
	
	this._loadConnections();
};

DatabaseConnectionFactory.getInstance = function() {
	if (!instance) {
		creatingInstance = true;
		instance = new DatabaseConnectionFactory();
		creatingInstance = false;
	}
	
	return instance;
};

DatabaseConnectionFactory.prototype._loadConnections = function() {
	var self = this;
	var connectionsPath = path.join(path.dirname(module.filename), 'db');
	
	fs.readdirSync(connectionsPath).forEach(function(item) {
		if (item[0] == '.') {
			return;
		}
		
		var connectionPath = path.join(connectionsPath, item, item + 'DatabaseConnection');
		var connection = require(connectionPath);
		self.registerConnection(connection.identifier, connection);
	});
}

DatabaseConnectionFactory.prototype.registerConnection = function(name, klass) {
	this.connections[name] = klass;
};

DatabaseConnectionFactory.prototype.make = function(name, args) {
	if (!this.connections[name]) {
		return null;
	}
	
	var connectionClass = this.connections[name];
	
	var connection = Object.create(connectionClass.prototype);
	connectionClass.apply(connection, args);
	return connection;
}

module.exports = DatabaseConnectionFactory;