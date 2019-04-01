const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'This is so cool 😃';

sentiment.analyze(input, (err, result) => {
    test('asynchronous positive text and emoji', t => {
        t.type(result, 'object');
        t.equal(result.score, 3);
        t.equal(result.comparative, 0.6);
        t.equal(result.tokens.length, 5);
        t.equal(result.words.length, 2);
        t.end();
    });
});
