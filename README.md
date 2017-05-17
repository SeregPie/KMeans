# almete.KMeans

`almete.KMeans(vectors, centroids, options)`

...

| argument | description |
| ---: | :--- |
| `values` | ... |
| `centroids` | ... |

Returns an array of maximal cliques.

## dependencies

*no dependencies*

## usage

```javascript
let vectors = [[1, 1, 1], ...];
let clusters = almete.KMeans(vectors, 3);
// => [[4, 6], [4, 3], [4, 5], [2, 5, 1]]
```

---

```javascript
let vectors = [[1, 1, 1], ...];
let centroids = [[1, 1, 1], ...];
let clusters = almete.KMeans(vectors, centroids);
// => [[4, 6], [4, 3], [4, 5], [2, 5, 1]]
```

---

```javascript
let Pole = class {
  constructor(name, position) {
  
  }
  
  getPosition() {
     return this._position;
  }
  
  toString() {
    return this._name;
  }
};
let poles = [new Pole(), new Pole(), new Pole()];
let clusters = almete.KMeans(poles, 2, {getVector: pole => pole.getPosition()});
// => [[4, 6], [4, 3], [4, 5], [2, 5, 1]]
```

## see also

- [almete.NearestNeighborChain](https://github.com/SeregPie/almete.NearestNeighborChain)
