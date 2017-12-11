var negators = require('./negators-en.json');

module.exports = {
    apply: function(cursor, tokens, item) {
        if (cursor > 0) {
            var prevtoken = tokens[cursor-1];
            if (negators[prevtoken]) item = -item;
        }
        return item;
    }
}
