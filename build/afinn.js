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


/**
 * Read AFINN data from original format
 */
var hash = new Object(null);
var q = async.queue(function(task, callback){
   
    fs.readFile(task, function (err, data) {
        // Split lines
        var lines = data.toString().split(/\n/);
        async.forEach(lines, function (obj, callback) {
            var item = obj.split(/\t/);
            hash[item[0]] = Number(item[1]);
            callback();
        }, function (err) {
            if (err) throw new Error(err);
            callback(err);
        });
    });
}, 1);
q.drain = function(){
    // Write out JSON
    fs.writeFile(
        __dirname + '/AFINN.json',
        JSON.stringify(hash),
    function (err) {
        if (err) throw new Error(err);
        process.stdout.write('Complete.');
    });
};
q.push(path.join(__dirname, 'AFINN-en-165.txt'));
q.push(path.join(__dirname, 'emoji.txt'));
