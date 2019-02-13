module.exports = [{
	title: 'Event ID',
	path: `eventID`
}, {
	title: 'IP Address',
	path: `user.ip_address`
}, {
	title: 'Email Address',
	path: `context.headers.'email'`,
	transform: (data) => {
		return data.replace(/'/g, '');
	}
}];