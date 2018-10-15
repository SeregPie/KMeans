export default function(array, otherArray) {
	return array.map((value, index) => [value, otherArray[index]]);
}
