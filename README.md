## sentiment
#### AFINN-based sentiment analysis for Node.js

[![Build Status](https://travis-ci.org/thisandagain/sentiment.svg?branch=develop)](https://travis-ci.org/thisandagain/sentiment)
[![Coverage Status](https://coveralls.io/repos/thisandagain/sentiment/badge.svg?branch=develop&service=github)](https://coveralls.io/github/thisandagain/sentiment?branch=develop)
[![Dependency Status](https://david-dm.org/thisandagain/sentiment.svg)](https://david-dm.org/thisandagain/sentiment)
[![devDependency Status](https://david-dm.org/thisandagain/sentiment/dev-status.svg)](https://david-dm.org/thisandagain/sentiment#info=devDependencies)

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text. Sentiment provides serveral things:

- Performance (see benchmarks below)
- The ability to append and overwrite word / value pairs from the AFINN wordlist
- A build process that makes updating sentiment to future versions of the AFINN word list trivial

### Installation
```bash
npm install sentiment
```

### Usage
```javascript
var sentiment = require('sentiment');

var r1 = sentiment('Cats are stupid.');
console.dir(r1);        // Score: -2, Comparative: -0.666

var r2 = sentiment('Cats are totally amazing!');
console.dir(r2);        // Score: 4, Comparative: 1
```

### Adding / overwriting words
You can append and/or overwrite values from AFINN by simply injecting key/value pairs into a sentiment method call:
```javascript
var sentiment = require('sentiment');

var result = sentiment('Cats are totally amazing!', {
    'cats': 5,
    'amazing': 2  
});
console.dir(result);    // Score: 7, Comparative: 1.75
```

---

### Benchmarks
The primary motivation for designing `sentiment` was performance. As such, it includes a benchmark script within the test directory that compares it against the [Sentimental](https://github.com/thinkroth/Sentimental) module which provides a nearly equivalent interface and approach. Based on these benchmarks, running on a MacBook Pro with Node 0.12.7, `sentiment` is **twice as fast** as alternative implementations:

```bash
sentiment (Latest) x 544,714 ops/sec ±0.83% (99 runs sampled)
Sentimental (1.0.1) x 269,417 ops/sec ±1.06% (96 runs sampled)
```

To run the benchmarks yourself, simply:
```bash
make benchmark
```

---

### Testing
```bash
npm test
```
