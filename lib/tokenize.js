/**
 * Remove special characters and returns an array of tokens (words).
 *
 * @param   {string}  input
 *
 * @return  {array}
 */

module.exports = function(input) {
    if (input === undefined) return [];
    if (input.trim() === '') return [''];
    var tokens = input.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '').split(' ');
    return tokens;
};
