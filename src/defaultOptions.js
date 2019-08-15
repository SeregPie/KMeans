import Array_mean from './utils/Array/mean';
import Function_identity from './utils/Function/identity';

export default {
	distance(value, otherValue) {
		return Math.hypot(...value.map((n, i) => n - otherValue[i]));
	},

	map: Function_identity,

	maxIterations: 1024,

	mean(values) {
		return values[0].map((n, i) => Array_mean(values.map(value => value[i])));
	},

	random: Math.random,
};
