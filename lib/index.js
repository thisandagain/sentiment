/**
 * AFINN-based sentiment analysis for Node.js
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var _       = require('lodash'),
    async   = require('async'),
    afinn   = require('../build/AFINN.json');

/**
 * Tokenizes an input string.
 *
 * @param {String} Input
 *
 * @return {Array}
 */
function tokenize (input) {
    return input
            .replace(/[^a-zA-Z ]+/g, '')
            .replace('/ {2,}/',' ')
            .toLowerCase()
            .split(' ');
}

/**
 * Performs sentiment analysis on the provided input "phrase".
 *
 * @param {String} Input phrase
 * @param {Object} Optional sentiment additions to AFINN (hash of word/value pairs)
 *
 * @return {Object}
 */
module.exports = function (phrase, inject, callback) {
    // Parse arguments
    if (typeof callback === 'undefined') {
        callback = inject;
        inject   = null;
    }

    // Merge
    if (inject !== null) {
        afinn = _.extend(afinn, inject);
    }

    // Storage objects
    var tokens      = tokenize(phrase),
        score       = 0,
        words       = [],
        positive    = [],
        negative    = [];

    // Iterate over tokens
    async.forEach(tokens, function (obj, callback) {
        var item = afinn[obj];
        if (typeof item === 'undefined') return callback();

        words.push(obj);
        if (item > 0) positive.push(obj);
        if (item < 0) negative.push(obj);

        score += item;
        callback();
    }, function (err) {
        callback(err, {
            score:          score,
            comparative:    score / tokens.length,
            tokens:         tokens,
            words:          words,
            positive:       positive,
            negative:       negative
        });
    });
};