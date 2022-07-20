const logLevels = {
	success: 'SUCCESS',
	trace: 'TRACE',
	debug: 'DEBUG',
	info: 'INFO',
	warn: 'WARN',
	error: 'ERROR',
	fatal: 'FATAL',
};

module.exports = {
	routing: {
		USER_ROOT: '/auth',
		PROFILE_ROOT: '/profile',
		GURU_ROOT: '/guru',
		STRIPE_ROOT: '/stripe',
		GLOBAL_ROOT: '/global',
	},
	paginations: {
		DEFAULT_LIMIT: 60,
	},
};
