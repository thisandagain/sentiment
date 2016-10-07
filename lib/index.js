/**
 * AFINN-based sentiment analysis for Node.js
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrewsliwinski@acm.org>
 */

/**
 * Dependencies
 */
var afinn = require('../build/AFINN.json');
var tokenize = require('./tokenize');

/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} Input phrase
 * @param {Object} Optional sentiment additions to AFINN (hash k/v pairs)
 *
 * @return {Object}
 */
module.exports = function (phrase, inject, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof inject === 'undefined') inject = null;
    if (typeof inject === 'function') callback = inject;
    if (typeof callback === 'undefined') callback = null;

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
