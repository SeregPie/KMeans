let assert = require('assert');
//let JustMyLuck = require('just-my-luck');

let KMeans = require('./index');

{
	let clusters = [
		[[6, 7, 9], [5, 2, 4], [7, 7, 0], [7, 6, 4], [8, 3, 4], [7, 8, 7], [6, 5, 5], [8, 5, 8]],
		[[0, 9, 2], [3, 8, 2]],
		[[0, 1, 6], [0, 4, 8], [2, 3, 5], [0, 3, 6], [0, 4, 9]],
	];
	let vectors = clusters.flat();
	let centroids = [[7, 0, 0], [0, 7, 0], [0, 0, 7]];
	assert.deepStrictEqual(KMeans(vectors, centroids), clusters);
}

{
	let vectorSize = 3;
	let vectorsCount = 1000;
	let clustersCount = 12;
	let vectors = Array.from({length: vectorsCount}, () => Array.from(({length: vectorSize}), () => Math.random()));
	let clusters = KMeans(vectors, clustersCount);
	assert.strictEqual(clusters.length, clustersCount);
	assert.strictEqual(clusters.flat().length, vectorsCount);
}

assert.deepStrictEqual(KMeans([], 3), [[], [], []]);

assert.deepStrictEqual(KMeans([[1], [2], [3]], 0), []);

{
	let vectors = [[1], [2], [3]];
	assert.deepStrictEqual(KMeans(vectors, 1), [vectors]);
}

/*
Array.from({length: 1000}).forEach(() => {
	let clustersCount = JustMyLuck.integer(2, 8);
	let clusters = Array.from({length: clustersCount}, (v, i) => {
		let vectorsCount = JustMyLuck.integer(1, 4);
		let vectors = Array.from({length: vectorsCount}, () => {
			return [i];
		});
		return vectors;
	});
	let vectors = clusters.flat();
	assert.deepStrictEqual(KMeansPlusPlus(vectors, clusters.length, {
		map: i => [i],
	}).sort((a, b) => a[0] - b[0]), clusters);
});
*/

Array.from({length: 100}).forEach(() => {
	assert.deepStrictEqual(KMeans([[1]], 2), [[[1]], []]);
});

{
	let Athlete = class {
		constructor(name, height, weight) {
			this.name = name;
			this.height = height;
			this.weight = weight;
		}
		toJSON() {
			return this.name;
		}
	};
	let athletes = [
		new Athlete('A', 185, 72), new Athlete('B', 170, 56), new Athlete('C', 168, 60),
		new Athlete('D', 179, 68), new Athlete('E', 182, 72), new Athlete('F', 188, 77),
		new Athlete('G', 180, 71), new Athlete('H', 180, 70), new Athlete('I', 183, 84),
		new Athlete('J', 180, 88), new Athlete('K', 180, 67), new Athlete('L', 177, 76),
	];
	let meanHeight = athletes.map(({height}) => height).reduce((r, n, i, {length}) => (r + n) / length, 0);
	let meanWeight = athletes.map(({weight}) => weight).reduce((r, n, i, {length}) => (r + n) / length, 0);
	let clusteredAthletes = KMeans(athletes, [athletes[0], athletes[3]], {
		map: athlete => [athlete.height / meanHeight, athlete.weight / meanWeight],
	});
	assert.deepStrictEqual(
		JSON.parse(JSON.stringify(clusteredAthletes)),
		[
			['A', 'E', 'F', 'G', 'I', 'J', 'L'],
			['B', 'C', 'D', 'H', 'K'],
		],
	);
}
