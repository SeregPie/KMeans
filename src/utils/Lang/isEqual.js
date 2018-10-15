let Lang_isEqual = function(value, otherValue) {
	if (value === otherValue) {
		return true;
	}
	if (Array.isArray(value)) {
		if (Array.isArray(otherValue)) {
			if (value.length === otherValue.length) {
				return value.every((value, index) => Lang_isEqual(value, otherValue[index]));
			}
		}
	}
	return false;
};

export default Lang_isEqual;
