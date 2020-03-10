export default function(that, iteratee) {
	let result = 0;
	that.map(iteratee).reduce((r, n, i) => {
		if (n < r) {
			r = n;
			result = i;
		}
		return r;
	});
	return result;
}
