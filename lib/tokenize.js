/**
 * Remove special characters and returns an array of tokens (words).
 *
 * @param   {string}  input
 *
 * @return  {array}
 */
var emojiRegex = require('emoji-regex');

module.exports = function(input) {
    if(input === undefined) throw new Error('input undefined');
    var str = input.toLowerCase()
        .replace(/[^a-z0-9á-úñäâàéèëêïîöôùüûœç\- ]+/g, '')
        .replace('/ {2,}/', ' ').replace('/ {2,}/', ' ')
        .split(' ');
    str = str.filter(function(str) {
        return /\S/.test(str);
    });
    var emojis = input
        .match(emojiRegex());
    if (emojis !== null) {
        emojis = emojis.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });
        return str.concat(emojis);
    } else {
        return str;
    }
};
