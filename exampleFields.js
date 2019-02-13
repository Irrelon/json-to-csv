module.exports = [{
	title: 'User ID',
	path: `id`
}, {
	title: 'Email Address',
	path: `user.auth.email`,
	transform: (data) => {
		return data.replace(/'/g, '');
	}
}];