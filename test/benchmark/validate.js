const Sentiment = require('../../lib/index');
const sentiment = new Sentiment();

const amazon = require('../fixtures/amazon.json');
const imdb = require('../fixtures/imdb.json');
const yelp = require('../fixtures/yelp.json');

function validate(set) {
    // Storage object
    const obj = {
        pass: 0,
        fail: 0
    };

    // Iterate over each word/class pair in the dataset
    for (var i in set) {
        const score = sentiment.analyze(set[i].text).comparative;
        if (set[i].class === 0) {
            if (score >= 0) ++obj.fail;
            if (score < 0) ++obj.pass;
        } else {
            if (score >= 0) ++obj.pass;
            if (score < 0) ++obj.fail;
        }
    }

    // Calculate Rand accuracy
    return obj.pass / (obj.pass + obj.fail);
}

process.stdout.write(`Amazon accuracy: ${validate(amazon)}\n`);
process.stdout.write(`  IMDB accuracy: ${validate(imdb)}\n`);
process.stdout.write(`  Yelp accuracy: ${validate(yelp)}\n`);
