var helper = require('./helper');
var tokenize = require('./tokenize');

/**
 * These words "flip" the sentiment of the following word.
 */
var negators = {
    'cant': 1,
    'can\'t': 1,
    'dont': 1,
    'don\'t': 1,
    'doesnt': 1,
    'doesn\'t': 1,
    'not': 1,
    'non': 1,
    'wont': 1,
    'won\'t': 1,
    'isnt': 1,
    'isn\'t': 1
};

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} Input phrase
 * @param {String} Input language code (2 digit code)
 * @param {Object} Optional sentiment additions to AFINN (hash k/v pairs)
 *
 * @return {Object}
 */
// sentiment('Hello world')
// sentiment('Hello world', 'en')
// sentiment('Hello world', { foo: 'bar' })
// sentiment('Hello world', function () => {})
// sentiment('Hello world', 'en', { foo: 'bar' })
// sentiment('Hello world', 'en', function () => {})
// sentiment('Hello world', { foo: 'bar' }, function () => {})
// sentiment('Hello world', 'en', { foo: 'bar' }, function () {})
module.exports = function (phrase, lang, inject, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof lang !== 'string') {
        if (typeof lang === 'object' && typeof inject === 'function') {
            callback = inject;
            inject = lang;
            lang = 'en';
        } else {
            if (typeof lang === 'object') inject = lang;
            if (typeof lang === 'function') callback = lang;
            lang = 'en';
        }
    }
    if (typeof inject === 'undefined') inject = null;
    if (typeof inject === 'function') callback = inject;
    if (typeof callback === 'undefined') callback = null;

    var afinn = helper.getAfinnTranslations(lang);

    // Merge
    if (inject !== null) {
        afinn = Object.assign(afinn, inject);
    }

    // Storage objects
    var tokens      = tokenize(phrase),
        score       = 0,
        words       = [],
        positive    = [],
        negative    = [];

    // Iterate over tokens
    var len = tokens.length;
    while (len--) {
        var obj = tokens[len];
        var item = afinn[obj];
        if (!afinn.hasOwnProperty(obj)) continue;

        // Check for negation
        if (len > 0) {
            var prevtoken = tokens[len-1];
            if (negators[prevtoken]) item = -item;
        }

        words.push(obj);
        if (item > 0) positive.push(obj);
        if (item < 0) negative.push(obj);

        score += item;
    }

    // Handle optional async interface
    var result = {
        score:          score,
        comparative:    tokens.length > 0 ? score / tokens.length : 0,
        tokens:         tokens,
        words:          words,
        positive:       positive,
        negative:       negative
    };

    if (callback === null) return result;
    process.nextTick(function () {
        callback(null, result);
    });
};
