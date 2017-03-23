/**
 * Converts raw AFINN data to JSON hash table.
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async = require('async'),
    fs = require('fs'),
    path = require('path');

function setup(callback) {
    callback(null, {});
}

/**
 * Read emoji data from original format
 */
function processEmoji(hash, callback) {
    fs.readFile(path.join(__dirname, 'Emoji_Sentiment_Data_v1.0.csv'),
        function(err, data) {
            var first = true;
            async.forEach(data.toString().split(/\n/),
                function(line, callback) {
                    if (first) { // Skip the first line with column names
                        first = false;
                        callback();
                    } else {
                        var lineItem = line.split(',');
                        var occurences = lineItem[2];
                        var negativeCount = lineItem[4];
                        var positiveCount = lineItem[6];
                        var sentiment = Math.floor(5 * (
                            (positiveCount / occurences) -
                            (negativeCount / occurences)
                        ));
                        if (!Number.isNaN(sentiment) && 0 !== sentiment) {
                            hash[line[0]] = sentiment;
                        }
                        callback();
                    }
                },
                function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, hash);
                    }
                });
        });
}

/**
 * Read AFINN data from original format
 */
function processAFINN(hash, callback) {
    fs.readFile(path.join(__dirname, 'AFINN-en-165.txt'), function(err, data) {
        // Split lines
        async.forEach(data.toString().split(/\n/), function(line, callback) {
            var item = line.split(/\t/);
            hash[item[0]] = Number(item[1]);
            callback();
        }, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, hash);
            }
        });
    });
}

/**
 * Write sentiment score hash
 */
function finish(hash, callback) {
    fs.writeFile(
        __dirname + '/AFINN.json',
        JSON.stringify(hash),
        function(err) {
            if (err) callback(err);
            else callback(null, hash);
        });
}

async.waterfall([
    setup,
    processEmoji,
    processAFINN,
    finish
], function(error, result) {
    if (error) {
        process.stderr.write('Error');
    } else {
        process.stderr.write('Complete.\n');
    }
});
