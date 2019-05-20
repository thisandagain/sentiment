const assert = require('assert');

const { Sentiment } = require('sentiment');
assert.ok(Sentiment);

const sentiment = new Sentiment();
assert.ok(sentiment);

const result = sentiment.analyze('hello world');
assert.ok(result);

console.info('Deployment test successful.');

process.exit(0);
