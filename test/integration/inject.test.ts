import { Sentiment } from '../../src';

test('Inject', async () => {
    const sentiment = new Sentiment();
    const input = 'This is so cool';

    const result = await sentiment.analyze(input, {
        extras: {
            'cool': 100
        }
    });

    expect(typeof result).toBe('object');
    expect(result.score).toEqual(100);
    expect(result.comparative).toEqual(25);
    expect(result.tokens.length).toEqual(4);
    expect(result.words.length).toEqual(1);
});

