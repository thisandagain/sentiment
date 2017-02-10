var fs = require('fs');
var path = require('path');

var src = path.resolve(__dirname, './yelp_labelled.txt');
var target = path.resolve(__dirname, './yelp.json');

fs.readFile(src, function (err, data) {
    if (err) throw new Error(err);

    // Storage object
    var result = [];

    // Split lines
    var lines = data.toString().split(/\n/);
    lines.forEach(function (obj) {
        var item = obj.split(/\t/);
        result.push({
            text: item[0],
            class: parseInt(item[1], 10)
        });
    });

    // Write out JSON
    fs.writeFile(
        target,
        JSON.stringify(result),
    function (err) {
        if (err) throw new Error(err);
        process.stdout.write('Complete.');
    });
});
