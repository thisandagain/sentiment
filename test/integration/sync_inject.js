const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'This is so cool';
const options = {
    extras: { cool: 100 }
};

const result = sentiment.analyze(input, options);

test('synchronous inject', t => {
    t.type(result, 'object');
    t.equal(result.score, 100);
    t.equal(result.comparative, 25);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 1);
    t.end();
});
