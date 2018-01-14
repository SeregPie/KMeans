export default function(array, iteratee) {
	let returns;
	let minNumber = Infinity;
	array.forEach((value, index) => {
		let newNumber = iteratee(value, index);
		if (newNumber < minNumber) {
			minNumber = newNumber;
			returns = value;
		}
	});
	return returns;
}
