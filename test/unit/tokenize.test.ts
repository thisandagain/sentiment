import { tokenize } from '../../src/tokenize';


describe('#tokenize', () => {
    it('should be a function', () => {
        expect(tokenize).toBeInstanceOf(Function);
    });

    it('should return an array with a token when given one token', () => {
        const word = 'foo';

        const result = tokenize(word);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);
        expect(result).toContain(word);
    });

    it('should throw an error when given a number', () => {
        expect(() => tokenize(10 as any))
            .toThrowError(/^Cannot tokenize non-string values./);
    });

    it('should throw an error when given an object', () => {
        expect(() => tokenize({ foo: true } as any))
            .toThrowError(/^Cannot tokenize non-string values./);
    });

    it('should throw an error when given an array', () => {
        expect(() => tokenize([1, 'two', true, {}] as any))
            .toThrowError(/^Cannot tokenize non-string values./);
    });

    it('should return an array with two tokens when given a string of two tokens separated by a space.', () => {
        const token1 = 'foo';
        const token2 = 'bar';
        const sentence = `${token1} ${token2}`;

        const result = tokenize(sentence);

        expect(result).toBeInstanceOf(Array);
        expect(result).toContain(token1);
        expect(result).toContain(token2);
        expect(result.length).toBe(2);
    });

    it('should return an array of tokens when separated by newlines.', () => {
        const token1 = 'foo';
        const token2 = 'bar';
        const sentence = `${token1}\n\n${token2}`;

        const result = tokenize(sentence);
        expect(result).toBeInstanceOf(Array);
        expect(result).toContain(token1);
        expect(result).toContain(token2);
        expect(result.length).toBe(2);
    });

    describe('tokenizing English sentences', () => {
        it('should tokenize a simple English sentence separated by spaces and ending in a period', () => {
            const sentence = 'The cat went over the wall.';
            const expectedResult = ['the', 'cat', 'went', 'over', 'the', 'wall'];

            const result = tokenize(sentence);

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(expectedResult.length);
            expectedResult.forEach(word => {
                expect(result).toContain(word);
            });
        });

        it('should tokenize contractions', () => {
            const sentence = "that'll cause problems for the farmer's pigs.";
            const expectedResult = ["that'll", 'cause', 'problems', 'for', 'the', "farmer's", 'pigs'];

            const result = tokenize(sentence);

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(expectedResult.length);
            expectedResult.forEach(word => {
                expect(result).toContain(word);
            });
        });
    });

    describe('tokenizing sentences with diacritics', () => {
        it('should tokenize a sentence that contains a word with the letter "ï"', () => {
            const sentence = 'This approach is naïve.';
            const expectedResult = ['this', 'approach', 'is', 'naïve'];

            const result = tokenize(sentence);

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(expectedResult.length);
            expectedResult.forEach(word => {
                expect(result).toContain(word);
            });
        });

        it('should tokenize a sentence that contains a word with the letter "ö"', () => {
            const sentence = 'The puppy bowl team was very coöperative.';
            const expectedResult = ['the', 'puppy', 'bowl', 'team', 'was', 'very', 'coöperative'];

            const result = tokenize(sentence);

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(expectedResult.length);
            expectedResult.forEach(word => {
                expect(result).toContain(word);
            });
        });

        it('should tokenize a sentence that contains a word with the letter "é"', () => {
            const sentence = 'The soufflé was delicious!';
            const expectedResult = ['the', 'soufflé', 'was', 'delicious'];

            const result = tokenize(sentence);

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(expectedResult.length);
            expectedResult.forEach(word => {
                expect(result).toContain(word);
            });
        });
    });
});

