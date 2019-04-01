const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();
const mock = require('mock-require');
const input = 'This is so cool';

// Mock a supported language
mock('../../languages/yy/index', {
    labels: { cool: 20 }
});

const result = sentiment.analyze(input, { language: 'yy' });

test('synchronous positive', t => {
    t.type(result, 'object');
    t.equal(result.score, 20);
    t.equal(result.comparative, 5);
    t.equal(result.tokens.length, 4);
    t.equal(result.words.length, 1);
    t.end();
});
