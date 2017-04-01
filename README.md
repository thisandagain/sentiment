## sentiment
#### AFINN-based sentiment analysis for Node.js

[![Build Status](https://travis-ci.org/thisandagain/sentiment.svg?branch=develop)](https://travis-ci.org/thisandagain/sentiment)
[![Coverage Status](https://coveralls.io/repos/thisandagain/sentiment/badge.svg?branch=develop&service=github)](https://coveralls.io/github/thisandagain/sentiment?branch=develop)
[![Greenkeeper badge](https://badges.greenkeeper.io/thisandagain/sentiment.svg)](https://greenkeeper.io/)

Sentiment is a Node.js module that uses the [AFINN-165](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist and [Emoji Sentiment Ranking](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0144296) to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text. Sentiment provides several things:

- Performance (see benchmarks below)
- The ability to append and overwrite word / value pairs from the AFINN wordlist
- A build process that makes updating sentiment to future wordlists trivial

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
A primary motivation for designing `sentiment` was performance. As such, it includes a benchmark script within the test directory that compares it against the [Sentimental](https://github.com/thinkroth/Sentimental) module which provides a nearly equivalent interface and approach. Based on these benchmarks, running on a MacBook Pro with Node v6.9.1, `sentiment` is **twice as fast** as alternative implementations:

```bash
sentiment (Latest) x 448,788 ops/sec ±1.02% (88 runs sampled)
Sentimental (1.0.1) x 240,103 ops/sec ±5.13% (81 runs sampled)
```

To run the benchmarks yourself:
```bash
make benchmark
```

---

### Validation
While the accuracy provided by AFINN is quite good considering it's computational performance (see above) there is always room for improvement. Therefore the `sentiment` module is open to accepting PRs which modify or amend the AFINN / Emoji datasets or implementation given that they improve accuracy and maintain similar performance characteristics. In order to establish this, we test the `sentiment` module against [three labelled datasets provided by UCI](https://archive.ics.uci.edu/ml/datasets/Sentiment+Labelled+Sentences).

To run the validation tests yourself:
```bash
make validate
```

#### Rand Accuracy (AFINN Only)
```
Amazon:  0.70
IMDB:    0.76
Yelp:    0.67
```

#### Rand Accuracy (AFINN + Additions)
```
Amazon:  0.72 (+2%)
IMDB:    0.76 (+0%)
Yelp:    0.69 (+2%)
```

---

### Testing
```bash
npm test
```
