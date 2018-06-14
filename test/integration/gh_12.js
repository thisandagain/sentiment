const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'self-deluded';
const result = sentiment.analyze(input);

test('synchronous positive', t => {
    t.type(result, 'object');
    t.equal(result.score, -2);
    t.equal(result.comparative, -2);
    t.equal(result.tokens.length, 1);
    t.equal(result.words.length, 1);
    t.end();
});
