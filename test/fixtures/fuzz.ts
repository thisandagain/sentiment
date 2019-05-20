function rand(limit: number) {
    return Math.floor(Math.random() * limit);
}

function createRandomWord(length: number) {
    const consonants = 'bcdfghjklmnpqrstvwxyz!@#$%^&*()_+":;\'?><~`';
    const vowels = 'aeiou';
    let word = '';
    
    for (let i = 0; i < length / 2; i++) {
        const randConsonant = consonants[rand(consonants.length)];
        const randVowel = vowels[rand(vowels.length)];

        word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
        word += i * 2 < length - 1 ? randVowel : '';
    }

    return word;
}

export function fuzz(length: number) {
    let words = '';
    for (let i = 0; i < length; i++) {
        words += `${createRandomWord(rand(20))} `;
    }
    words = words.trimRight();
    return words;
};
