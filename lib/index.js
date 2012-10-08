/**
 * AFINN-based sentiment analysis for Node.js
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
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
            .split(" ");
}

/**
 * Constructor
 */
module.exports = function () {

    /**
     * Performs sentiment analysis on the provided input "phrase".
     *
     * @param {String} Input phrase
     *
     * @return {Object}
     */
    function sentiment (phrase, callback) {
        var tokens  = tokenize(phrase),
            score   = 0,
            words   = [];

        // Iterate over tokens
        async.forEach(tokens, function (obj, callback) {
            var item = afinn[obj];
            if (typeof item === 'undefined') return callback();

            words.push(obj);
            score += item;
            callback();
        }, function (err) {
            callback(err, {
                score:          score,
                comparative:    score / tokens.length,
                tokens:         tokens,
                words:          words
            });
        });
    }

    // ---------------------------------
    // ---------------------------------

    return sentiment;

}();