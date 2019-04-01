const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'constructor';
const result = sentiment.analyze(input);

test('synchronous positive', t => {
    t.type(result, 'object');
    t.equal(result.score, 0);
    t.equal(result.comparative, 0);
    t.equal(result.tokens.length, 1);
    t.equal(result.words.length, 0);
    t.end();
});
