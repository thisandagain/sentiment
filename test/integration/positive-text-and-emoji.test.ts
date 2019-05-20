import { Sentiment } from '../../src';

test('GH Issue 15 - Regex accidentally modifying words', async () => {
    const sentiment = new Sentiment();
    const input = 'This is so cool 😃';

    const result = await sentiment.analyze(input);

    expect(typeof result).toBe('object');
    expect(result.score).toEqual(3);
    expect(result.comparative).toEqual(0.6);
    expect(result.tokens.length).toEqual(5);
    expect(result.words.length).toEqual(2);
});
