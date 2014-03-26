var Application = require('./lib/Application'),
	DatabaseConnectionFactory = require('./lib/DatabaseConnectionFactory'),
	MySQLDatabaseConnectionAdapter = require('./lib/db/MySQL/MySQLDatabaseConnectionAdapter'),
	NotificationCenter = require('./lib/NotificationCenter');

NotificationCenter.getInstance().addObserver(Application.LAUNCH_EVENT, function() {
	var connection = DatabaseConnectionFactory.getInstance().make(MySQLDatabaseConnectionAdapter.identifier, ['mysql://localhost']);
	connection.select('users', ['id', 'username']).where('uid = 1').limit(1).execute(function(rows) {
		console.log('Found user: ' + rows[0].username);
	});
});

Application.getInstance().run();