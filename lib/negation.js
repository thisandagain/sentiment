var spelling = require('./spelling');

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
 * Evaluates wether the current token is negated by a previous token
 * 
 * @param {array} afinn words list
 * @param {array} tokens list of tokens being evaluated
 * @param {int} pos position of the current word in the tokens list
 * 
 * @return {boolean} true if the current pos is being negaed, false otherwise
 */
module.exports = function negated(afinn, tokens, pos) {
    while (pos--) {
        if (negators[tokens[pos]]) {
            return true;
        }
        var word = spelling.getSpellCheckedWord(tokens[pos]);
        if (negators[word]) {
            return true;
        } else if (afinn.hasOwnProperty(word)) {
            return false;
        }
    }
    return false;
};
