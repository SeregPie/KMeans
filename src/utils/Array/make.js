export default function(length, iteratee) {
	return Array.from({length}, iteratee);
}
