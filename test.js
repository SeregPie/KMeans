/*eslint no-console: 0*/

let KMeans = require('./almete.KMeans');

{
	let vectorSize = 3, vectorsCount = 1000, clustersCount = 12;
	let vectors = Array.from({length: vectorsCount}, () => Array.from(({length: vectorSize}), () => Math.random()));
	let clusters = KMeans(vectors, clustersCount);
	console.log(clusters.length === clustersCount); // => true
	console.log([].concat(...clusters).length === vectorsCount); // => true
}
{
	let vectors = [
		[6, 7, 9], [0, 1, 6], [5, 2, 4], [7, 7, 0], [0, 4, 8],
		[0, 9, 2], [2, 3, 5], [0, 3, 6], [7, 6, 4], [8, 3, 4],
		[7, 8, 7], [6, 5, 5], [8, 5, 8], [3, 8, 2], [0, 4, 9],
	];
	let centroids = [[7, 0, 0], [0, 7, 0], [0, 0, 7]];
	let clusters = KMeans(vectors, centroids);
	console.log(JSON.stringify(clusters[0]) === JSON.stringify([[6, 7, 9], [5, 2, 4], [7, 7, 0], [7, 6, 4], [8, 3, 4], [7, 8, 7], [6, 5, 5], [8, 5, 8]]));
	console.log(JSON.stringify(clusters[1]) === JSON.stringify([[0, 9, 2], [3, 8, 2]]));
	console.log(JSON.stringify(clusters[2]) === JSON.stringify([[0, 1, 6], [0, 4, 8], [2, 3, 5], [0, 3, 6], [0, 4, 9]]));
}
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
	let clusters = KMeans(athletes, [athletes[0], athletes[1]], {
		map: athlete => [athlete.height, athlete.weight],
	});
	console.log(JSON.stringify(clusters) === JSON.stringify([['A', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'], ['B', 'C']]));
}
