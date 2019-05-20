import { Sentiment } from '../../src';

// Related issue: https://github.com/thisandagain/sentiment/issues/13
test('GH Issue 13 - Constructor bug', () => {
    const sentiment = new Sentiment();
    const input = 'constructor';

    const result = sentiment.analyze(input);

    expect(typeof result).toBe('object');
    expect(result.score).toEqual(0);
    expect(result.comparative).toEqual(0);
    expect(result.tokens.length).toEqual(1);
    expect(result.words.length).toEqual(0);
});
