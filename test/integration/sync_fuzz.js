const test = require('tap').test;
const fuzz = require('../fixtures/fuzz');
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = fuzz(1000);

test('synchronous fuzz', t => {
    t.type(sentiment.analyze(input), 'object');
    t.end();
});
