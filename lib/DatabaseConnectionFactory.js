var DatabaseConnectionFactory = function() {
	if (!creatingInstance) {
		throw new Error("Cannot create new instance of singleton NotificationCenter.");
	}
	
	this.adapters = {};
};

DatabaseConnectionFactory.getInstance = function() {
	if (!instance) {
		creatingInstance = true;
		instance = new DatabaseConnectionFactory();
		creatingInstance = false;
	}
	
	return instance;
};

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