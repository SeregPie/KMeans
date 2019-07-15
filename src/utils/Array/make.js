export default function(length, iteratee) {
	let array = [];
	for (let i = 0; i < length; i++) {
		array[i] = iteratee(i);
	}
	return array;
}
