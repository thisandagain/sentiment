/**
 * Converts raw AFINN data to JSON hash table.
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    fs      = require('fs');

/**
 * Read AFINN data from original format
 */
fs.readFile(__dirname + '/AFINN.txt', function (err, data) {
    // Storage object
    var hash = new Object(null);

    // Split lines
    var lines = data.toString().split(/\n/);
    console.dir(lines);
    async.forEach(lines, function (obj, callback) {
        var item = obj.split(/\t/);
        hash[item[0]] = Number(item[1]);
        callback();
    }, function (err) {
        if (err) throw new Error(err);

        // Write out JSON
        fs.writeFile(__dirname + '/AFINN.json', JSON.stringify(hash), function (err) {
            if (err) throw new Error(err);
            console.log('Complete.');
        });
    });
});