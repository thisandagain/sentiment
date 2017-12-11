var helper = require('./helper');
var tokenize = require('./tokenize');

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} Input phrase
 * @param {String} Input language code (2 digit code)
 * @param {Object} Optional sentiment additions to AFINN (hash k/v pairs)
 *
 * @return {Object}
 */
module.exports = function (phrase, lang, inject, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof lang !== 'string') {
        if (typeof lang === 'object' && typeof inject === 'function') {
            callback = inject;
            inject = lang;
        } else {
            if (typeof lang === 'object') inject = lang;
            if (typeof lang === 'function') callback = lang;
        }
        lang = 'en';
    }
    if (typeof inject === 'undefined') inject = null;
    if (typeof inject === 'function') callback = inject;
    if (typeof callback === 'undefined') callback = null;

    var afinn = helper.getTranslations(lang);

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
    var i = tokens.length;
    while (i--) {
        var obj = tokens[i];
        var item = afinn[obj];
        if (!afinn.hasOwnProperty(obj)) continue;

        // Apply negation strategy if available
        item = helper.applyNegationStrategy(lang, i, tokens, item);

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
