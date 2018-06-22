var read = require('fs').readFileSync;
var dictionary = null;

module.exports = function() {
    if (dictionary ===  null) {
        var base = require.resolve('dictionary-en-us');
        dictionary = {
            'aff': read(base.replace('.js', '.aff'), 'utf-8'),
            'dic': read(base.replace('.js', '.dic'), 'utf-8')
        };
    }
    return dictionary;
};
