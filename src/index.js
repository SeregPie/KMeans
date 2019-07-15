import Array_indexOfMin from './utils/Array/indexOfMin';
import Array_make from './utils/Array/make';
import Array_mean from './utils/Array/mean';
import Function_identity from './utils/Function/identity';
import Function_stubArray from './utils/Function/stubArray';
import Number_isNumber from './utils/Number/isNumber';

let KMeans = function(values, centroids, {
	centroid: getCentroid = KMeans.centroid,
	distance: getDistance  = KMeans.distance,
	map = KMeans.map,
	maxIterations = KMeans.maxIterations,
} = {}) {
	values = Array.from(values);
	let vectors;
	let clusters;
	if (Number_isNumber(centroids)) {
		if (!centroids) {
			return [];
		}
		if (centroids === 1) {
			return [[...values]];
		}
		vectors = values.map(value => map(value));
		clusters = Array_make(centroids, Function_stubArray);
		centroids = vectors.slice(0, centroids);
	} else {
		centroids = Array.from(centroids);
		if (!centroids.length) {
			return [];
		}
		if (centroids.length === 1) {
			return [[...values]];
		}
		vectors = values.map(value => map(value));
		clusters = centroids.map(Function_stubArray);
		centroids = centroids.map(value => map(value));
	}
	let labels = [];
	for (let i = 0; i < maxIterations; i++) {
		labels.forEach((clusterIndex, vectorIndex) => {
			clusters[clusterIndex].push(vectors[vectorIndex]);
		});
		centroids = centroids.map((centroid, clusterIndex) => {
			let vectors = clusters[clusterIndex];
			if (vectors.length) {
				centroid = getCentroid(vectors);
			}
			return centroid;
		});
		let converged = true;
		vectors.forEach((vector, vectorIndex) => {
			let clusterIndex = Array_indexOfMin(centroids, centroid => getDistance(vector, centroid));
			if (clusterIndex !== labels[vectorIndex]) {
				labels[vectorIndex] = clusterIndex;
				converged = false;
			}
		});
		clusters = clusters.map(Function_stubArray);
		if (converged) {
			break;
		}
	}
	labels.forEach((clusterIndex, valueIndex) => {
		clusters[clusterIndex].push(values[valueIndex]);
	});
	return clusters;
};

Object.assign(KMeans, {
	centroid(vectors) {
		return vectors[0].map((n, i) => Array_mean(vectors.map(vector => vector[i])));
	},

	distance(vector, otherVector) {
		return Math.hypot(...vector.map((n, i) => n - otherVector[i]));
	},

	map: Function_identity,

	maxIterations: 1024,
});

export default KMeans;
