/**
 * Spellchecking library
 */
var spelling = require('../../lib/spelling');

/**
 * These words "flip" the sentiment of the following word.
 */
var negators = require('./negators.json');

/**
 * Language labels and scores
 */
var labels = require('./labels.json');

/**
 * Evaluates wether the current token is negated by a previous token
 * 
 * @param {array} tokens list of tokens being evaluated
 * @param {int} pos position of the current word in the tokens list
 * 
 * @return {boolean} true if the current pos is being negaed, false otherwise
 */
module.exports = function negated(tokens, pos, spellCheck) {
    while (pos--) {
        if (negators[tokens[pos]]) {
            return true;
        }
        var word = spellCheck ?
            spelling.getSpellCheckedWord(tokens[pos]) :
            tokens[pos];
        if (negators[word]) {
            return true;
        } else if (labels.hasOwnProperty(word)) {
            return false;
        }
    }
    return false;
};
