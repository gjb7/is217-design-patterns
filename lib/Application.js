var NotificationCenter = require('./NotificationCenter');

var instance;
var creatingInstance = false;

function Application() {
	if (!creatingInstance) {
		throw new Error("Cannot create new instance of singleton Application.");
	}
};

Application.getInstance = function() {
	if (!instance) {
		creatingInstance = true;
		instance = new Application();
		creatingInstance = false;
	}
	
	return instance;
};

Application.prototype.run = function() {
	NotificationCenter.getInstance().post(Application.LAUNCH_EVENT, this);
};

Application.LAUNCH_EVENT = "Application.LAUNCH_EVENT";

module.exports = Application;