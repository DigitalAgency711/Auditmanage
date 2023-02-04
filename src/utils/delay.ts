const delay = (delayMilliSeconds: number) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('');
		}, delayMilliSeconds);
	});
};

export { delay };
