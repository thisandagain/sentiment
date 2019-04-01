const test = require('tap').test;
const corpus = require('../fixtures/corpus');
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const dataset = corpus;
const result = sentiment.analyze(dataset);

test('synchronous corpus', t => {
    t.type(result, 'object');
    t.equal(result.score, -3);
    t.equal(result.tokens.length, 1416);
    t.equal(result.words.length, 73);
    t.end();
});
