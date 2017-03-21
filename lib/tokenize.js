/**
 * Remove special characters and returns an array of tokens (words).
 *
 * @param   {string}  input
 *
 * @return  {array}
 */
var spliddit = require('spliddit');

module.exports = function(input) {
    if (input === undefined) throw new Error('input undefined');
    if (input.trim() === '') return [''];
    var tokens = spliddit(input.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, ''), ' ');
    if (spliddit.hasPair(input)) {
        tokens.forEach(function(token) {
            if (spliddit.hasPair(token)) {
                var index = tokens.indexOf(token);
                tokens.splice(index, token.length);
                spliddit(token).forEach(function(subToken) {
                    tokens.splice(index, 0, subToken);
                    index+=subToken.length;
                });
            }
        });
    }
    return tokens;
};
