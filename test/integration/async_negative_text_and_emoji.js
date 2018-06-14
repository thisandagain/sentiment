const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'Hey you worthless scumbag 😦';

sentiment.analyze(input, (err, result) => {
    test('asynchronous negative text and emoji', t => {
        t.type(result, 'object');
        t.equal(result.score, -8);
        t.equal(result.comparative, -1.6);
        t.equal(result.tokens.length, 5);
        t.equal(result.words.length, 3);
        t.end();
    });
});
