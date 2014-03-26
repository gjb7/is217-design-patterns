var fs = require('fs'),
	path = require('path');

var instance;	
var creatingInstance = false;

function DatabaseConnectionFactory() {
	if (!creatingInstance) {
		throw new Error("Cannot create new instance of singleton NotificationCenter.");
	}
	
	this.adapters = {};
	
	this._loadAdapters();
};

DatabaseConnectionFactory.getInstance = function() {
	if (!instance) {
		creatingInstance = true;
		instance = new DatabaseConnectionFactory();
		creatingInstance = false;
	}
	
	return instance;
};

DatabaseConnectionFactory.prototype._loadAdapters = function() {
	var self = this;
	var adaptersPath = path.join(path.dirname(module.filename), 'db');
	
	fs.readdirSync(adaptersPath).forEach(function(item) {
		var adapterPath = path.join(adaptersPath, item, item + 'DatabaseConnectionAdapter');
		var adapter = require(adapterPath);
		self.registerAdapater(adapter.identifier, adapter);
	});
}

DatabaseConnectionFactory.prototype.registerAdapater = function(name, klass) {
	this.adapters[name] = klass;
};

DatabaseConnectionFactory.prototype.make = function(name, args) {
	if (!this.adapters[name]) {
		return null;
	}
	
	var adapterKlass = this.adapters[name];
	
	var adapter = Object.create(adapterKlass.prototype);
	adapterKlass.apply(adapter, args);
	return adapter;
}

module.exports = DatabaseConnectionFactory;