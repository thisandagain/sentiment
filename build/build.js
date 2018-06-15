const fs = require('fs');
const path = require('path');

// File paths
const EMOJI_PATH = path.resolve(__dirname, 'Emoji_Sentiment_Data_v1.0.csv');
const RESULT_PATH = path.resolve(__dirname, 'emoji.json');

/**
 * Read emoji data from original format (CSV).
 * @param  {object}   hash     Result hash.
 * @return {object}   hash     Result hash.
 */
const processEmoji = async hash => {
    // Read file
    try {
        const data = await fs.readFileSync(EMOJI_PATH, 'utf8');
        // Split data by new line
        const lines = data.split(/\n/);
        // Iterate over dataset and add to hash
        for (const i in lines) {
            const line = lines[i].split(',');
            // Validate line
            if (i === '0' || i === 0 || line.length !== 9) continue;
            //  ^ Label     ^ Label    ^ Invalid

            // Establish sentiment value
            const emoji = String.fromCodePoint(line[1]);
            const occurences = line[2];
            const negCount = line[4];
            const posCount = line[6];
            const score = posCount / occurences - negCount / occurences;
            const sentiment = Math.floor(5 * score);

            // Validate score
            if (Number.isNaN(sentiment) || sentiment === 0) continue;

            // Add to hash
            hash[emoji] = sentiment;
        }
        return hash;
    } catch (e) {
        throw new Error(e);
    }
};

/**
 * Write sentiment score hash to disk.
 * @param  {object}   hash     Result hash
 * @return {object}   hash     Result hash
 */
const finish = async hash => {
    const result = JSON.stringify(hash, null, 4);
    try {
        await fs.writeFileSync(RESULT_PATH, result);
        return hash;
    } catch (e) {
        throw new Error(e);
    }
};

// Execute build process
const build = async () => {
    try {
        let hash = {};
        hash = await processEmoji(hash);
        hash = await finish(hash);
        process.stderr.write(
            `Complete: ${Object.keys(hash).length} entries.\n`
        );
    } catch (e) {
        throw new Error(e);
    }
};
build();
