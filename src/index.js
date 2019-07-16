import Array_indexOfMin from './utils/Array/indexOfMin';
import Array_make from './utils/Array/make';
import Array_mean from './utils/Array/mean';
import Function_identity from './utils/Function/identity';
import Function_stubArray from './utils/Function/stubArray';
import Number_isNumber from './utils/Number/isNumber';

let KMeans = function(originalValues, means, {
	distance: calculateDistance = KMeans.distance,
	map = KMeans.map,
	maxIterations = KMeans.maxIterations,
	mean: calculateMean = KMeans.mean,
} = {}) {
	originalValues = Array.from(originalValues);
	let values;
	let clusters;
	if (Number_isNumber(means)) {
		if (!means) {
			return [];
		}
		if (means === 1) {
			return [[...originalValues]];
		}
		values = originalValues.map(value => map(value));
		clusters = Array_make(means, Function_stubArray);
		means = values.slice(0, means);
	} else {
		means = Array.from(means);
		if (!means.length) {
			return [];
		}
		if (means.length === 1) {
			return [[...originalValues]];
		}
		values = originalValues.map(value => map(value));
		clusters = means.map(Function_stubArray);
		means = means.map(value => map(value));
	}
	let labels = [];
	for (let i = 0; i < maxIterations; i++) {
		labels.forEach((clusterIndex, valueIndex) => {
			clusters[clusterIndex].push(values[valueIndex]);
		});
		means = means.map((mean, clusterIndex) => {
			let values = clusters[clusterIndex];
			if (values.length) {
				mean = calculateMean(values);
			}
			return mean;
		});
		let converged = true;
		values.forEach((value, valueIndex) => {
			let clusterIndex = Array_indexOfMin(means, mean => calculateDistance(value, mean));
			if (clusterIndex !== labels[valueIndex]) {
				labels[valueIndex] = clusterIndex;
				converged = false;
			}
		});
		clusters = clusters.map(Function_stubArray);
		if (converged) {
			break;
		}
	}
	labels.forEach((clusterIndex, valueIndex) => {
		clusters[clusterIndex].push(originalValues[valueIndex]);
	});
	return clusters;
};

Object.assign(KMeans, {
	distance(value, otherValue) {
		return Math.hypot(...value.map((n, i) => n - otherValue[i]));
	},

	map: Function_identity,

	maxIterations: 1024,

	mean(values) {
		return values[0].map((n, i) => Array_mean(values.map(value => value[i])));
	},
});

export default KMeans;
