const test = require('tap').test;
const languageProcessor = require('../../lib/language-processor');
const englishLanguage = require('../../languages/en/index');

test('spec', t => {
    t.type(languageProcessor, 'object');
    t.type(languageProcessor.getLanguage, 'function');
    t.type(languageProcessor.getLabels, 'function');
    t.type(languageProcessor.applyScoringStrategy, 'function');
    t.end();
});

test('getLanguage', t => {
    t.deepEqual(languageProcessor.getLanguage(), englishLanguage);
    t.deepEqual(languageProcessor.getLanguage(null), englishLanguage);
    t.deepEqual(languageProcessor.getLanguage('en'), englishLanguage);
    t.throws(() => {
        // Should throw with unknown language code
        languageProcessor.getLanguage('xx');
    });
    t.end();
});
