export default function(array, iteratee) {
	let minIterateeValue = iteratee(array[0], 0);
	return array.reduce((minValue, value, index) => {
		let iterateeValue = iteratee(value, index);
		if (minIterateeValue > iterateeValue) {
			minIterateeValue = iterateeValue;
			minValue = value;
		}
		return minValue;
	});
}
