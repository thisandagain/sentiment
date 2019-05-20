import { Sentiment } from '../../src';

test('Negative Text and Emoji', async () => {
    const sentiment = new Sentiment();
    const input = 'Hey you worthless scumbag 😦';
    const expectedTokens = ['hey', 'you', 'worthless', 'scumbag', '😦'];
    const expectedWords = ['worthless', 'scumbag', '😦'];
    const result = await sentiment.analyze(input);

    expect(result).toBeDefined();
    expect(result.score).toBe(-8);
    expect(result.comparative).toBeCloseTo(-1.6);
    expect(result.tokens.length).toBe(5);
    expect(result.words.length).toBe(3);
    expectedTokens.forEach(token => expect(result.tokens).toContain(token));
    expectedWords.forEach(word => expect(result.words).toContain(word));
});
