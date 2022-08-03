export const proxy = () => {
	return process.env.NODE_ENV === 'production'
		? 'https://www.mickeyfitness.com'
		: 'http://localhost:3000';
};

export const serverProxy = () => {
	return process.env.NODE_ENV === 'production'
		? 'https://api.mickeyfitness.com'
		: 'http://localhost:8080';
};