var instance;
var creatingInstance = false;

var NotificationCenter = function() {
	if (!creatingInstance) {
		throw new Error("Cannot create new instance of singleton NotificationCenter.");
	}
	
	this.observers = {};
};

NotificationCenter.getInstance = function() {
	if (!instance) {
		creatingInstance = true;
		instance = new NotificationCenter();
		creatingInstance = false;
	}
	
	return instance;
};

NotificationCenter.prototype.addObserver = function(eventName, observer) {
	if (!this.observers[eventName]) {
		this.observers[eventName] = [];
	}
	
	this.observers[eventName].push(observer);
}

NotificationCenter.prototype.removeObserver = function(eventName, observer) {
	if (!this.observers[eventName]) {
		return;
	}
	
	var index = this.observers[eventName].indexOf(observer);
	if (index !== -1) {
		this.observers[eventName].splice(index, 1);
	}
}

NotificationCenter.prototype.post = function(eventName, object, userData) {
	var observers = this.observers[eventName];
	if (observers) {
		observers.forEach(function(observer) {
			observer(object, userData);
		});
	}
}