const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'This is so cool 😃';
const result = sentiment.analyze(input);

test('synchronous positive with emoji', t => {
    t.type(result, 'object');
    t.equal(result.score, 3);
    t.equal(result.comparative, 0.6);
    t.equal(result.tokens.length, 5);
    t.equal(result.words.length, 2);
    t.end();
});
