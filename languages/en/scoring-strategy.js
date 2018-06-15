const negators = require('./negators.json');

const apply = (tokens, cursor, tokenScore) => {
    if (cursor > 0) {
        const prevtoken = tokens[cursor - 1];
        if (negators[prevtoken]) {
            tokenScore = -tokenScore;
        }
    }
    return tokenScore;
};

module.exports = {
    apply
};
