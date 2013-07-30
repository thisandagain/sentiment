var fs      = require('fs'),
    hint    = require('hint-hint');

var config  = fs.readFileSync(__dirname + '/../../.jshintrc');
hint(__dirname + '/../../lib/*.js', JSON.parse(config));