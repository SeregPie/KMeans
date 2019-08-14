import Function_identity from '../Function/identity';

export default function(array, iteratee = Function_identity) {
	let returns = 0;
	array.map(iteratee).reduce((r, n, i) => {
		if (n < r) {
			r = n;
			returns = i;
		}
		return r;
	});
	return returns;
}
