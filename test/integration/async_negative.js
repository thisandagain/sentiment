const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'Hey you worthless scumbag';

sentiment.analyze(input, (err, result) => {
    test('asynchronous negative', t => {
        t.type(result, 'object');
        t.equal(result.score, -6);
        t.equal(result.comparative, -1.5);
        t.equal(result.tokens.length, 4);
        t.equal(result.words.length, 2);
        t.end();
    });
});
