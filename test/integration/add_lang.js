const test = require('tap').test;
const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

test('adding a language with no labels attribute should throw', t => {
    t.throws(() => {
        sentiment.registerLanguage('xx', {});
    }, new Error('language.labels must be defined!'));
    t.end();
});
