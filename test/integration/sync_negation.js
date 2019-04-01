const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const input = 'I don\'t hate you';
const result = sentiment.analyze(input);

test('synchronous negation', t => {
    t.type(result, 'object');
    t.equal(result.score, 3);
    t.equal(result.comparative, 0.75);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 1);
    t.end();
});
