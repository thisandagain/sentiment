var read = require('fs').readFileSync;
var dictiaonary = null;

module.exports = function() {
    if (dictiaonary ===  null) {
        var base = require.resolve('dictionary-en-us');
        dictiaonary = {
            'aff': read(base.replace('.js', '.aff'), 'utf-8'),
            'dic': read(base.replace('.js', '.dic'), 'utf-8')
        };
    }
    return dictiaonary;
};
