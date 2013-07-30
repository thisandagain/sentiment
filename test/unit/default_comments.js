var async       = require('async'),
    test        = require('tap').test,
    sentiment   = require(__dirname + '/../../lib/index');

var load = [
    'In America I doubt it could sustain itself without descending into identity politics and ego.',
    'You are deluding yourself if you think that identity politics and ego are purely American.',
    'Posting a show that cost $5 and was for charity is pretty low and I thought better of BoingBoing. A clip or two would be great, but just pirating something like this is lame.',
    'I paid the $5, only got to see the last 30 minutes of the event, and cant download it today, because when I log in, it asks for my credit card information. So the only way it looks like Ill get to watch it is through a pirated copy.',
    'Thanks for posting it, Cory! What Ive seen of the debate was awesome, but from a technical and customer service standpoint, it was a catastrophe.',
    'Bill OReillys total inability to shut up while anyone else is speaking makes me either wonder how he ever got his job, or think that you can be inordinately successful just by bullying.'
];

async.map(load, function (obj, callback) {
    sentiment(obj, callback);
}, function (err, obj) {
    console.dir(err);
    console.dir(obj);

    test('unit', function (t) {
        t.equal(err, null, 'error object should be null');
        t.type(obj, 'object', 'results should be an object');
        t.equal(obj.length, 6, 'results should be of expected length');

        t.equal(obj[0].score, -1, 'Expected score');
        t.equal(obj[0].comparative, -0.06666666666666667, 'Expected comparative score');
        t.equal(obj[0].tokens.length, 15, 'Expected tokens length');
        t.equal(obj[0].words.length, 1, 'Expected match length');
        
        t.end();
    });
});