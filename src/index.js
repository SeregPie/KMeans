import Array_minBy from './utils/Array/minBy';
import Function_identity from './utils/Function/identity';
import Function_stubArray from './utils/Function/stubArray';
import Lang_isEqual from './utils/Lang/isEqual';

let KMeans = function(values, centroids, options) {
	let {
		maxIterations,
		map,
		distance,
		mean,
	} = {...KMeans, ...options};
	if (values.length < 1) {
		return [];
	}
	let vectors;
	if (Array.isArray(centroids)) {
		if (centroids.length < 1) {
			return [];
		}
		if (centroids.length === 1) {
			return [values.slice()];
		}
		vectors = values.map(value => map(value));
		centroids = centroids.map(value => map(value));
	} else {
		if (centroids < 1) {
			return [];
		}
		if (centroids === 1) {
			return [values.slice()];
		}
		if (centroids >= values.length) {
			return values.map(value => [value]);
		}
		vectors = values.map(value => map(value));
		centroids = vectors.slice(0, centroids);
	}
	let clusters = [];
	for (let i = 0; i < maxIterations; i++) {
		let newClusters = centroids.map(Function_stubArray);
		vectors.forEach((vector, index) => {
			let cluster = Array_minBy(newClusters, (cluster, index) =>
				distance(vector, centroids[index])
			);
			cluster.push(index);
		});
		newClusters = newClusters.filter(({length}) => length > 0);
		if (Lang_isEqual(newClusters, clusters)) {
			break;
		}
		clusters = newClusters;
		centroids = clusters.map(cluster =>
			mean(cluster.map(index => vectors[index]))
		);
	}
	return clusters.map(cluster => cluster.map(index => values[index]));
};

Object.assign(KMeans, {
	maxIterations: 1024,

	map: Function_identity,

	distance(vector, otherVector) {
		return Math.sqrt(vector.reduce((squaredDistance, value, index) =>
			squaredDistance + Math.pow(value - otherVector[index], 2)
		, 0));
	},

	mean(vectors) {
		return vectors
			.map(vector =>
				vector.map(value => value / vectors.length)
			)
			.reduce((centroid, vector) =>
				centroid.map((value, index) => value + vector[index])
			);
	},
});

export default KMeans;
