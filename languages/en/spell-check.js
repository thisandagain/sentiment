var spelling = require('./spelling');

module.exports = function(labels, token) {
    return spelling.getSpellCheckedAfinnWord(labels, token);
};
