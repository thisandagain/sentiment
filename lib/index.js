var helper = require('./helper');
var tokenize = require('./tokenize');

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} phrase - Input phrase
 * @param {Object} opts - Options
 * @param {Object} opts.language - Input language code (2 digit code), defaults to 'en'
 * @param {Object} opts.extras - Optional sentiment additions to AFINN (hash k/v pairs)
 * @param {function} callback - Optional callback
 *
 * @return {Object}
 */
module.exports = function (phrase, opts, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }
    opts = opts || {};

    var lang = opts.language || 'en';
    var afinn = helper.getTranslations(lang);

    // Merge
    if (typeof opts.extras === 'object') {
        afinn = Object.assign(afinn, opts.extras);
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

    if (typeof callback === 'function') {
        process.nextTick(function () {
            callback(null, result);
        });
    } else {
        return result;
    }
};
