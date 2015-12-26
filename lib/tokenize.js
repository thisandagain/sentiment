/**
 * Remove special characters and returns an array of tokens (words).
 *
 * @param   {string}  input
 *
 * @return  {array}
 */
module.exports = function (input) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9á-úñäâàéèëêïîöôùüûœç\- ]+/g, '')
        .replace('/ {2,}/',' ')
        .split(' ');
};
