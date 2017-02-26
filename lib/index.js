/**
 * AFINN-based sentiment analysis for Node.js
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrewsliwinski@acm.org>
 */

/**
 * Dependencies
 */
var afinn_translations = require('afinn-165-multilingual').afinn_translations;
afinn_translations.afinn_en = require('../build/AFINN.json');
var afinn = afinn_translations.afinn_en;
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
module.exports = function (phrase, lang, inject, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof lang === 'undefined') lang = 'en';
    if (typeof inject === 'undefined') inject = null;
    if (typeof inject === 'function') callback = inject;
    if (typeof callback === 'undefined') callback = null;

    afinn = afinn_translations['afinn_'+lang];

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
        comparative:    score / tokens.length,
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
