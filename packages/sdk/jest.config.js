// jest.config.js
module.exports = {
    setupFiles: ['./jest.setup.js'], // Adjust the path if necessary

    transform: {
        '^.+\\.tsx?$': 'ts-jest', // For TypeScript
        '^.+\\.jsx?$': 'babel-jest', // For JavaScript
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'node',
};