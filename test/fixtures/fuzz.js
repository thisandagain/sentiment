const rand = limit => Math.floor(Math.random() * limit);

const createRandomWord = length => {
    const consonants = 'bcdfghjklmnpqrstvwxyz!@#$%^&*()_+":;\'?><~`'.split('');
    const vowels = 'aeiou'.split('');
    let word = '';

    // Create word
    for (let i = 0; i < length / 2; i++) {
        const randConsonant = consonants[rand(consonants.length)];
        const randVowel = vowels[rand(vowels.length)];

        word += i === 0 ? randConsonant.toUpperCase() : randConsonant;
        word += i * 2 < length - 1 ? randVowel : '';
    }
    return word;
};

const fuzz = length => {
    const words = [];
    for (let i = 0; i < length; i++) {
        words.push(createRandomWord(rand(20)));
    }
    return words.join(' ');
};

module.exports = fuzz;
