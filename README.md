# sentiment
### AFINN-based sentiment analysis for Node.js

[![CircleCI](https://circleci.com/gh/thisandagain/sentiment.svg?style=svg)](https://circleci.com/gh/thisandagain/sentiment)
[![Greenkeeper badge](https://badges.greenkeeper.io/thisandagain/sentiment.svg)](https://greenkeeper.io/)

Sentiment is a Node.js module that uses the [AFINN-165](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist and [Emoji Sentiment Ranking](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0144296) to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text. Sentiment provides several things:

- Performance (see benchmarks below)
- The ability to append and overwrite word / value pairs from the AFINN wordlist
- The ability to easily add support for new languages
- The ability to easily define custom strategies for negation, emphasis, etc. on a per-language basis

## Table of contents

- [sentiment](#sentiment)
    - [AFINN-based sentiment analysis for Node.js](#afinn-based-sentiment-analysis-for-nodejs)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage example](#usage-example)
  - [Adding new languages](#adding-new-languages)
  - [Adding and overwriting words](#adding-and-overwriting-words)
  - [API Reference](#api-reference)
      - [`sentiment.analyze(phrase, [options], [callback])`](#sentimentanalyzephrase-options-callback)
      - [`AnalyzeOptions`](#analyzeoptions)
      - [`sentiment.registerLanguage(languageCode, language)`](#sentimentregisterlanguagelanguagecode-language)
      - [`Language`](#language)
      - [`ScoringStrategy`](#scoringstrategy)
  - [How it works](#how-it-works)
    - [AFINN](#afinn)
    - [Tokenization](#tokenization)
  - [Benchmarks](#benchmarks)
  - [Validation](#validation)
    - [Rand Accuracy (AFINN Only)](#rand-accuracy-afinn-only)
    - [Rand Accuracy (AFINN + Additions)](#rand-accuracy-afinn--additions)
  - [Testing](#testing)

## Installation

```bash
npm install sentiment
```

## Usage example

Javascript:
```js
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const result = sentiment.analyze('Cats are stupid.');
console.table(result);    // Score: -2, Comparative: -0.666
```

Typescript:
```ts
import { Sentiment } from 'sentiment';
const sentiment = new Sentiment();
const result = sentiment.analyze('Cats are stupid.');
console.table(result);    // Score: -2, Comparative: -0.666
```

## Adding new languages

You can add support for a new language by registering it using the `registerLanguage` method:

Javascript:
```js
const Sentiment = require('sentiment');
const sentiment = new Sentiment(); 

const frLanguage = {
  labels: { 'stupide': -2 }
};
sentiment.registerLanguage('fr', frLanguage);

const result = sentiment.analyze('Le chat est stupide.', { languageCode: 'fr' });
console.dir(result);    // Score: -2, Comparative: -0.5
```

Typescript:
```ts
import { Sentiment, LanguageInput } from 'sentiment';

const sentiment = new Sentiment();
const frLanguage: LangaugeInput = {
  labels: { 'stupide': -2 }
};
sentiment.registerLanguage('fr', frLanguage);

const result = sentiment.analyze('Le chat est stupide.', { languageCode: 'fr' });
console.dir(result);    // Score: -2, Comparative: -0.5

```

You can also define custom scoring strategies to handle things like negation and emphasis on a per-language basis:

Javascript:
```js
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const frLanguage = {
  labels: { 'stupide': -2 },
  scoringStrategy: function(tokens, cursor, tokenScore) {
    if (cursor > 0) {
      const prevtoken = tokens[cursor - 1];
      if (prevtoken === 'pas') {
        tokenScore = -tokenScore;
      }
    }
    return tokenScore;
  }
};
sentiment.registerLanguage('fr', frLanguage);

const result = sentiment.analyze('Le chat n\'est pas stupide', { language: 'fr' });
console.dir(result);    // Score: 2, Comparative: 0.4
```

Typescript:
```ts
import { Sentiment, LanguageInput } from 'sentiment';

const frLanguage: LanguageInput = {
  labels: { 'stupide': -2 },
  scoringStrategy: (tokens, cursor, tokenScore) => {
    if (cursor > 0) {
      const prevtoken = tokens[cursor - 1];
      if (prevtoken === 'pas') {
        tokenScore = -tokenScore;
      }
    }
    return tokenScore;
  }
};

const sentiment = new Sentiment();

sentiment.registerLanguage('fr', frLanguage);

const result = sentiment.analyze('Le chat n\'est pas stupide', { language: 'fr' });
console.dir(result);    // Score: 2, Comparative: 0.4

```

## Adding and overwriting words

You can append and/or overwrite values from AFINN by simply injecting key/value pairs into a sentiment method call:

Javascript:
```js
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const options = {
  extras: {
    cats: 5,
    amazing: 2
  }
};
const result = sentiment.analyze('Cats are totally amazing!', options);
console.dir(result);    // Score: 7, Comparative: 1.75
```

Typescript:
```ts
import { Sentiment, AnalyzeOptions } from 'sentiment';

const options: AnalyzeOptions = {
  extras: {
    cats: 5,
    amazing: 2
  }
};

const result = sentiment.analyze('Cats are totally amazing!', options);
console.dir(result);    // Score: 7, Comparative: 1.75

```
## API Reference

#### `sentiment.analyze(phrase, [options], [callback])`

| Argument | Type             | Required | Description                  |
| -------- | ---------------- | -------- | ---------------------------- |
| phrase   | `string`         | `true`   | Input phrase to analyze      |
| options  | `AnalyzeOptions` | `false`  | AnalyzeOptions _(see below)_ |

---

#### `AnalyzeOptions`

| Property     | Type     | Default | Description                                                   |
| ------------ | -------- | ------- | ------------------------------------------------------------- |
| languageCode | `string` | `'en'`  | Language to use for sentiment analysis                        |
| extras       | `object` | `{}`    | Set of labels and their associated values to add or overwrite |

---

#### `sentiment.registerLanguage(languageCode, language)`

| Argument     | Type            | Required | Description                                                         |
| ------------ | --------------- | -------- | ------------------------------------------------------------------- |
| languageCode | `string`        | `true`   | International two-digit code for the language to add                |
| language     | `LanguageInput` | `true`   | Language module (see [Adding new languages](#adding-new-languages)) |

---

#### `Language`

| Property        | Type                       | Default                  | Description                                                                                            |
| --------------- | -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| labels          | `{[word: string]: number}` | `'en'`                   | Set of labels and their associated values                                                              |
| scoringStrategy | `ScoringStrategy`          | `defaultScoringStrategy` | A function used to calculate the score for a word. The default function simply returns the tokenScore. |

---

#### `ScoringStrategy`

| Argument   | Type     | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| tokens     | string[] | A list of tokens used for analysis                 |
| cursor     | number   | An index that points to the current word in tokens |
| tokenScore | number   | The score of the current word                      |

| Returns | Description                                      |
| ------- | ------------------------------------------------ |
| number  | A numeric value representing the score of a word |

## How it works

### AFINN
AFINN is a list of words rated for valence with an integer between minus five (negative) and plus five (positive). Sentiment analysis is performed by cross-checking the string tokens(words, emojis) with the AFINN list and getting their respective scores. The comparative score is simply: `sum of each token / number of tokens`. So for example let's take the following:

`I love cats, but I am allergic to them.`

That string results in the following:

```javascript
{
    score: 1,
    comparative: 0.1111111111111111,
    tokens: [
        'i',
        'love',
        'cats',
        'but',
        'i',
        'am',
        'allergic',
        'to',
        'them'
    ],
    words: [
        'allergic',
        'love'
    ],
    positive: [
        'love'
    ],
    negative: [
        'allergic'
    ]
}
```

* Returned Objects
    * __Score__: Score calculated by adding the sentiment values of recongnized words.
    * __Comparative__: Comparative score of the input string.
    * __Token__: All the tokens like words or emojis found in the input string.
    * __Words__: List of words from input string that were found in AFINN list.
    * __Positive__: List of postive words in input string that were found in AFINN list.
    * __Negative__: List of negative words in input string that were found in AFINN list.

In this case, love has a value of 3, allergic has a value of -2, and the remaining tokens are neutral with a value of 0. Because the string has 9 tokens the resulting comparative score looks like:
`(3 + -2) / 9 = 0.111111111`

This approach leaves you with a mid-point of 0 and the upper and lower bounds are constrained to positive and negative 5 respectively (the same as each token! 😸). For example, let's imagine an incredibly "positive" string with 200 tokens and where each token has an AFINN score of 5. Our resulting comparative score would look like this:

```
(max positive score * number of tokens) / number of tokens
(5 * 200) / 200 = 5
```

### Tokenization
Tokenization works by splitting the lines of input string, then removing the special characters, and finally splitting it using spaces. This is used to get list of words in the string.

---

## Benchmarks
A primary motivation for designing `sentiment` was performance. As such, it includes a benchmark script within the test directory that compares it against the [Sentimental](https://github.com/thinkroth/Sentimental) module which provides a nearly equivalent interface and approach. Based on these benchmarks using Node v11.10.1, `sentiment` is nearly twice as fast as alternative implementations.

Bench specs:
  - i5-8400 @ 2.80GHz 6 core
  - 16 GB (8GB x 2) RAM DDR4 2666 MT/s
  - WD Blue 3D NAND SSD - SATA III 6 Gb/s M.2


```bash
sentiment (Latest)  - Short: x 979,943 ops/sec ±2.01% (90 runs sampled)
sentiment (Latest)  - Long : x 4,370 ops/sec ±1.04% (90 runs sampled)

Sentimental (1.0.1) - Short: x 573,312 ops/sec ±1.17% (90 runs sampled)
Sentimental (1.0.1) - Long : x 2,143 ops/sec ±0.37% (92 runs sampled)
```

To run the benchmarks yourself:

```bash
npm run test:benchmark
```

---

## Validation
While the accuracy provided by AFINN is quite good considering it's computational performance (see above) there is always room for improvement. Therefore the `sentiment` module is open to accepting PRs which modify or amend the AFINN / Emoji datasets or implementation given that they improve accuracy and maintain similar performance characteristics. In order to establish this, we test the `sentiment` module against [three labelled datasets provided by UCI](https://archive.ics.uci.edu/ml/datasets/Sentiment+Labelled+Sentences).

To run the validation tests yourself:

```bash
npm run test:validate
```

### Rand Accuracy (AFINN Only)

```
Amazon:  0.70
IMDB:    0.76
Yelp:    0.67
```

### Rand Accuracy (AFINN + Additions)

```
Amazon:  0.72 (+2%)
IMDB:    0.76 (+0%)
Yelp:    0.69 (+2%)
```

---

## Testing

```bash
npm test
```
