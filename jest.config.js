module.exports = {
    testRegex: './test/integration/*.ts$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: [ 'ts', 'json' ],
};
