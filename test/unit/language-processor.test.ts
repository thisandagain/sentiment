import { LanguageProcessor } from '../../src/language-processor';

describe('LanguageProcessor', () => {
    describe('#constructor', () => {
        it('returns an instance of LanguageProcessor when given 0 arguments', () => {
            expect(() => new LanguageProcessor()).not.toThrow();
            expect(new LanguageProcessor()).toBeDefined();
        });

        
    })
});