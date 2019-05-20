
import { Sentiment } from '../../src';


test('Negative Sentiment', () => {
    const sentiment = new Sentiment();
    const input = 'Hey you worthless scumbag';
    
    const result = sentiment.analyze(input);
    
    expect(typeof result).toEqual('object');
    expect(result.score).toEqual(-6);
    expect(result.comparative).toEqual(-1.5);
    expect(result.tokens.length).toEqual(4);
    expect(result.words.length).toEqual(2);
});
