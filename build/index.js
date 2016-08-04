/**
 * Converts raw AFINN data to JSON hash table.
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/*globals Promise:true*/

/**
 * Dependencies
 */
var async = require('async'),
    fs = require('fs'),
    path = require('path');


function processFile(filename, hash) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, filename), function(err, data) {
            if (err) {
                reject(err);
            } else {
                // Storage object
                if (!hash) hash = {};

                // Split lines
                var lines = data.toString().split(/\n/);
                async.forEach(lines, function(obj, callback) {
                    var item = obj.split(/\t/);
                    if (item[0] !== '') {
                        hash[item[0]] = Number(item[1]);
                    }
                    callback();
                }, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
}

/**
 * Read AFINN data from original format
 */
processFile('AFINN.txt').then(function(result) {
    process.stderr.write('Done reading AFINN\n');
    processFile('emoji.txt', result).then(function(result) {
        process.stderr.write('Done reading emoji\n');
        // Write out JSON
        fs.writeFile(
            __dirname + '/AFINN.json',
            JSON.stringify(result),
            function(err) {
                if (err) throw new Error(err);
                else process.stderr.write('Done writing AFINN.json\n');
            });
    },
    function(error) {
        process.stderr.write('Error: ', error);
    }).catch(function(e) {
        process.stderr.write('Exception: ', e);
    });
}, function(error) {
    process.stderr.write('Error: ', error);
}).catch(function(e) {
    process.stderr.write('Exception: ', e);
});
