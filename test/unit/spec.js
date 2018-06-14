const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

test('module', t => {
    t.type(Sentiment, 'function', 'module is a function');
    t.end();
});

test('interface', t => {
    t.type(sentiment, 'object', 'instance is an object');
    t.type(sentiment.analyze, 'function', 'sentiment.analyze is a function');
    // eslint-disable-next-line max-len
    t.type(
        sentiment.registerLanguage,
        'function',
        'sentiment.registerLanguage is a function'
    );
    t.type(sentiment.analyze('test'), 'object');
    t.type(sentiment.analyze('test', { test: 10 }), 'object');
    t.end();
});
