## sentiment
#### AFINN-based sentiment analysis for Node.js

[![Build Status](https://secure.travis-ci.org/thisandagain/sentiment.png)](http://travis-ci.org/thisandagain/sentiment)

Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text.

### Installation
```bash
npm install sentiment
```

### Usage
```javascript
var sentiment = require('sentiment');

sentiment('Cats are stupid.', function (err, result) {
    console.dir(result);    // Score: -2, Comparative: -0.666
});

sentiment('Cats are totally amazing!', function (err, result) {
    console.dir(result);    // Score: 4, Comparative: 1
});
```

### Testing
```bash
npm test
```

### Benchmarks
The primary motivation for designing `sentiment` was performance. As such, `sentiment` includes a benchmark script within the test directory that compares it against the `Sentimental` module by [thinkroth](https://github.com/thinkroth). Based on these benchmarks from an older MacBook Air on Node 0.8.9, `sentiment` is about 97% faster than the alternative implementation:
```bash
sentiment
1000 operations  |  33ms
2000 operations  |  75ms
4000 operations  |  138ms
8000 operations  |  252ms
16000 operations |  506ms
32000 operations |  1120ms
64000 operations |  2268ms

--------------------------
--------------------------

Sentimental (by thnkroth)
1000 operations  |  1189ms
2000 operations  |  2392ms
4000 operations  |  4760ms
8000 operations  |  9469ms
16000 operations |  19513ms
32000 operations |  41018ms
64000 operations |  86931ms
```