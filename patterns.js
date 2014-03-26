var Application = require('./lib/Application'),
	DatabaseConnectionFactory = require('./lib/DatabaseConnectionFactory'),
	MySQLDatabaseConnection = require('./lib/db/MySQL/MySQLDatabaseConnection'),
	NotificationCenter = require('./lib/NotificationCenter');

NotificationCenter.getInstance().addObserver(Application.LAUNCH_EVENT, function() {
	var connection = DatabaseConnectionFactory.getInstance().make(MySQLDatabaseConnection.identifier, ['mysql://localhost']);
	connection.select('users', ['id', 'username']).where('uid = 1').limit(1).execute(function(result) {
		console.log('Found user: ' + result.row(0).username);
	});
});

Application.getInstance().run();