import labels from './labels.json';
import { scoringStrategy } from './scoring-strategy';
import { Language } from '../language';
// import { readFileSync } from 'fs';

// const labels = JSON.parse(readFileSync(__dirname + '/labels.json', 'utf8'));

export const spanish: Language = { 
    labels: labels,
    scoringStrategy: scoringStrategy
};

export default spanish;
