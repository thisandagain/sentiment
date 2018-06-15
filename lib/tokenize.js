/*eslint no-useless-escape: "off"*/

/**
 * Removes special characters and return an array of tokens (words).
 * @param  {string} input Input string.
 * @return {array}       Array of tokens.
 */
const tokenize = input =>
    input
        .toLowerCase()
        .replace(/\n/g, ' ')
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
        .split(' ');

module.exports = tokenize;
