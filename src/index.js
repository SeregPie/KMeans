import Array_minBy from '/utils/Array/minBy';
import Function_identity from '/utils/Function/identity';
import Function_stubArray from '/utils/Function/stubArray';
import Lang_isEqual from '/utils/Lang/isEqual';

let KMeans = function(values, initialCentroids, options) {
	let {
		maxIterations,
		map,
		distanceBetween,
		mean,
	} = {...KMeans, ...options};
	if (values.length < 1) {
		return [];
	}
	let vectors;
	if (Array.isArray(initialCentroids)) {
		if (initialCentroids.length < 1) {
			return [];
		}
		if (initialCentroids.length === 1) {
			return [values.slice()];
		}
		vectors = values.map(value => map(value));
		initialCentroids = initialCentroids.map(value => map(value));
	} else {
		if (initialCentroids < 1) {
			return [];
		}
		if (initialCentroids === 1) {
			return [values.slice()];
		}
		if (initialCentroids >= values.length) {
			return values.map(value => [value]);
		}
		vectors = values.map(value => map(value));
		initialCentroids = vectors.slice(0, initialCentroids);
	}
	let centroids = initialCentroids;
	let clusters = centroids.map(Function_stubArray);
	for (let i = 0; i < maxIterations; i++) {
		let newClusters = centroids.map(Function_stubArray);
		vectors.forEach((vector, index) => {
			let cluster = Array_minBy(newClusters, (cluster, index) => distanceBetween(vector, centroids[index]));
			cluster.push(index);
		});
		if (Lang_isEqual(newClusters, clusters)) {
			break;
		}
		clusters = newClusters;
		centroids = clusters.map((cluster, index) => (cluster.length > 0) ? mean(cluster.map(index => vectors[index])) : initialCentroids[index]);
	}
	return clusters.map(cluster => cluster.map(index => values[index]));
};

Object.assign(KMeans, {
	maxIterations: 1024,

	map: Function_identity,

	distanceBetween(vector, otherVector) {
		return Math.sqrt(vector.reduce((squaredDistance, value, index) => squaredDistance + Math.pow(value - otherVector[index], 2), 0));
	},

	mean(vectors) {
		return vectors
			.map(vector => vector.map(value => value / vectors.length))
			.reduce((centroid, vector) => centroid.map((value, index) => value + vector[index]));
	},
});

export default KMeans;
