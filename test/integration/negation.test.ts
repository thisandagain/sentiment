import { Sentiment } from '../../src';

test('Negation', async () => {
    const sentiment = new Sentiment();
    const input = 'I don\'t hate you';

    const result = await sentiment.analyze(input);
    
    expect(result.score).toBeGreaterThan(0);

    expect(typeof result).toEqual('object');
    expect(result.score).toBe(3);
    expect(result.comparative).toBeCloseTo(0.75);
    expect(result.tokens.length).toBe(4);
    expect(result.words.length).toBe(1);
    expect(result.words).toContain('hate');
});
