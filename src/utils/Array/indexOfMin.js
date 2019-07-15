export default function(array, iteratee) {
	let index = 0;
	let minIterateeValue = iteratee(array[index]);
	for (let i = 1, ii = array.length; i < ii; i++) {
		let iterateeValue = iteratee(array[i]);
		if (iterateeValue < minIterateeValue) {
			minIterateeValue = iterateeValue;
			index = i;
		}
	}
	return index;
}
