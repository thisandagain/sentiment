
const fs = require('fs');
const path = require('path');
const util = require('util');

const rf = util.promisify(fs.readFile);
const wf = util.promisify(fs.writeFile);

// File paths
const EMOJI_PATH = path.join(__dirname, 'Emoji_Sentiment_Data_v1.0.csv');
const RESULT_PATH = path.join(__dirname, 'emoji.json');

/**
 * Read emoji data from original format (CSV).
 * 
 * @return {{ [index: string]: number }}
 */
async function processEmoji() {
    try {
        const map = {};
        const data = await rf(EMOJI_PATH, 'utf-8');
        // Format:
        // Emoji,Unicode codepoint,Occurrences,Position,Negative,Neutral,Positive,Unicode name,Unicode block
        const lines = data.split(/\n/);
        // Remove label
        lines.shift();
        // Iterate over dataset and add to hash
        for (let line of lines) {
            const values = line.split(',');

            if (values.length !== 9) continue;  // Invalid

            // Establish sentiment value
            const emoji = String.fromCodePoint(values[1]);
            const occurences = values[2];
            const negCount = values[4];
            const posCount = values[6];
            const score = (posCount / occurences) - (negCount / occurences);
            const sentiment = Math.floor(5 * score);

            // Validate score
            if (Number.isNaN(sentiment)) continue;
            if (sentiment === 0) continue;

            // Add to hash
            map[emoji] = sentiment;
        }
        return map;
    } catch (err) {
        console.error('Error reading emoji file: ' + err);
    }
}


void async function run() {
    const data = await processEmoji();
    const prettyJson = JSON.stringify(data, null, 4);
    try {
        await wf(RESULT_PATH, prettyJson);
        console.info(`Complete: ${Object.keys(data).length} entries.`);
    } catch(err) {
        console.error('Error writing emoji file: ' + err);
    }
}().catch(console.error);
