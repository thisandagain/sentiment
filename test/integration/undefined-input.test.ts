import { Sentiment } from '../../src';

test('Undefined Input', async () => {
    const sentiment = new Sentiment();
    const input = undefined;

    expect(sentiment.analyze(input as any)).rejects.toHaveProperty('stack');
});
