// jest.config.js
module.exports = {
    setupFiles: ["./jest.setup.js"], // Adjust the path if necessary
    "collectCoverageFrom": ["src/*.ts", "src/**/*.ts"],
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        '^.+\\.js$': 'babel-jest',
        "^.+\\.ts?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios)"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper:{
        "@/(.*)$": "<rootDir>/src/$1"
      }

};