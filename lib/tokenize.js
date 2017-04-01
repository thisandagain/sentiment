/**
 * Remove special characters and return an array of tokens (words).
 * @param  {string} input Input string
 * @return {array}        Array of tokens
 */
module.exports = function(input) {
    return input
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
        .split(' ');
};
