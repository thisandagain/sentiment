const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'This is so cool';
const result = sentiment.analyze(input);

test('synchronous positive', t => {
    t.type(result, 'object');
    t.equal(result.score, 1);
    t.equal(result.comparative, 0.25);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 1);
    t.end();
});
