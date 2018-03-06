import Array_minBy from 'x/src/Array/minBy';
import Array_zip from 'x/src/Array/zip';

let KMeans = function(values, clusters, options) {
	let {
		maxIterations,
		map,
		isEqual,
		distanceBetween,
		mean,
	} = Object.assign({}, KMeans, options);
	if (maxIterations < 1) {
		return [];
	}
	let valuesCount = values.length;
	if (valuesCount < 1) {
		return [];
	}
	let clustersCount;
	let originalValues = values;
	if (Array.isArray(clusters)) {
		clustersCount = clusters.length;
		if (clustersCount < 1) {
			return [];
		}
		if (clustersCount === 1) {
			return [originalValues.slice()];
		}
		values = values.map(value => map(value));
		clusters = clusters.map(cluster => map(cluster));
	} else {
		clustersCount = clusters;
		if (clustersCount < 1) {
			return [];
		}
		if (clustersCount === 1) {
			return [originalValues.slice()];
		}
		if (clustersCount >= valuesCount) {
			return originalValues.map(originalValue => [originalValue]);
		}
		values = values.map(value => map(value));
		clusters = values.slice(0, clustersCount);
	}
	let zippedValues = Array_zip(originalValues, values);

	let clusteredValues;
	let continueLoop;
	do {
		clusteredValues = clusters.map(value => [[], [], value]);
		zippedValues.forEach(([originalValue, value]) => {
			let [originalValues, values] = Array_minBy(clusteredValues, ([,, clusterValue]) => distanceBetween(value, clusterValue));
			originalValues.push(originalValue);
			values.push(value);
		});
		if (--maxIterations < 1) {
			break;
		}
		continueLoop = false;
		clusters = clusteredValues.map(([, values, oldClusterValue]) => {
			if (values.length < 1) {
				return oldClusterValue;
			}
			let newClusterValue = mean(values);
			if (!isEqual(oldClusterValue, newClusterValue)) {
				continueLoop = true;
			}
			return newClusterValue;
		});
	} while (continueLoop);
	return clusteredValues.map(([originalValues]) => originalValues);
};

Object.assign(KMeans, {
	maxIterations: 1024,

	map(vector) {
		return vector;
	},

	isEqual(vector, otherVector) {
		return vector.every((value, index) => value === otherVector[index]);
	},

	distanceBetween(vector, otherVector) {
		let squaredDistance = 0;
		vector.forEach((value, index) => {
			squaredDistance += Math.pow(value - otherVector[index], 2);
		});
		return Math.sqrt(squaredDistance);
	},

	mean(vectors) {
		let vectorsCount = vectors.length;
		if (vectorsCount > 0) {
			let meanVector = vectors[0].map(() => 0);
			vectors.forEach(vector => {
				vector.forEach((value, index) => {
					meanVector[index] += value / vectorsCount;
				});
			});
			return meanVector;
		}
	},
});

export default KMeans;
