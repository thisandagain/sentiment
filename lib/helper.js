var afinn_translations = require('afinn-165-multilingual').afinn_translations;
var emojis = require('../build/emoji.json');

// Remove empty string entry
delete afinn_translations.afinn_en[''];

var translations = {
    en: Object.assign(emojis, afinn_translations.afinn_en)
};

module.exports = {
    getAfinnTranslations: function(lang) {
        if (!lang) {
            return translations.en;
        }
        if (!translations[lang]) {
            var translation = afinn_translations['afinn_' + lang];
            delete translation[''];
            translations[lang] = Object.assign(emojis, translation);
        }
        return translations[lang];
    }
};
