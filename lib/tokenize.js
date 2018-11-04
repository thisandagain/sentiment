/*eslint no-useless-escape: "off"*/

/**
 * Remove special characters and return an array of tokens (words).
 * @param  {string} input Input string
 * @return {array}        Array of tokens
 */
module.exports = function(input) {
    input = input
        .toLowerCase()
        .replace(/\n/g, ' ')
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
        .split(' ');
    // remove single quotes surrounding words but preserve apostrophes
    var i;
    for (i = 0; i < input.length; i++) {
        var word = input[i];
        if (word[0] === '\'' && word[word.length-1] === '\'') {
            word = word.substr(1, word.length-2);
            input[i] = word;
        }   
    }
    return input;
};
