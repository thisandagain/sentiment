/**
 * Remove special characters and returns an array of tokens (words).
 *
 * @param   {string}  input
 *
 * @return  {array}
 */

module.exports = function(input) {
    if(input === undefined) throw new Error('input undefined');
    if(input.trim() === '') return [];
    return input.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`\'\"~()]/g, '')
        .replace('/ {2,}/', ' ')
        .split(' ');
};
