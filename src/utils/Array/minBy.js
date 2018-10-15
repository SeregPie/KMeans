export default function(array, iteratee) {
	if (array.length > 0) {
		let minIterateeValue = iteratee(array[0], 0, array);
		return array.reduce((minValue, value, index) => {
			let iterateeValue = iteratee(value, index, array);
			if (minIterateeValue > iterateeValue) {
				minIterateeValue = iterateeValue;
				minValue = value;
			}
			return minValue;
		});
	}
}
