// jest.config.js
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // For TypeScript
        '^.+\\.jsx?$': 'babel-jest', // For JavaScript
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'node',
};