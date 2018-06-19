const emojis = require('../build/emoji.json');
// English is loaded by default
const enLanguage = require('../languages/en/index');
// Add emojis
Object.assign(enLanguage.labels, emojis);

// Cache loaded languages
const languages = {
    en: enLanguage
};

const defaultScoringStrategy = {
    apply: (tokens, cursor, tokenScore) => tokenScore
};
/**
 * Registers the specified language.
 * @param  {string} languageCode - Two-digit code for the language to register.
 * @param  {object} language - The language module to register.
 * @return {undefined}
 */
const addLanguage = (languageCode, language) => {
    if (!language.labels) {
        throw new Error('language.labels must be defined!');
    }
    // Add emojis
    Object.assign(language.labels, emojis);
    languages[languageCode] = language;
};
/**
 * Retrieves a language object from the cache, or tries to load it from the set
 *     of supported languages.
 * @param  {string} languageCode - Two-digit code for the language to fetch.
 * @return {undefined}
 */
const getLanguage = languageCode => {
    if (!languageCode) {
        // Default to english if no language was specified
        return languages.en;
    }
    if (!languages[languageCode]) {
        // Try to load specified language
        try {
            const language = require(`../languages/${languageCode}/index`);
            // Add language to in-memory cache
            addLanguage(languageCode, language);
        } catch (err) {
            throw new Error('No language found: ' + languageCode);
        }
    }
    return languages[languageCode];
};
/**
 * Returns AFINN-165 weighted labels for the specified language.
 * @param  {string} languageCode - Two-digit language code.
 * @return {object}
 */
const getLabels = languageCode => {
    const { labels } = getLanguage(languageCode);
    return labels;
};
/**
 * Applies a scoring strategy for the current token.
 * @param  {string} languageCode - Two-digit language code.
 * @param  {array} Tokens - Tokens of the phase to analyze.
 * @param  {int} cursor - Cursor of the current token being analyzed.
 * @param  {int} tokenScore - The score of the current token being analyzed.
 */
const applyScoringStrategy = (languageCode, tokens, cursor, tokenScore) => {
    const language = getLanguage(languageCode);
    // Fallback to default strategy if none was specified
    const scoringStrategy = language.scoringStrategy || defaultScoringStrategy;
    return scoringStrategy.apply(tokens, cursor, tokenScore);
};

module.exports = {
    addLanguage,
    getLanguage,
    getLabels,
    applyScoringStrategy
};
