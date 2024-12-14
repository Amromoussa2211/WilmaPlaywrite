export default {
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    testMatch: ["**/tests/unit/**/*.test.js"],
    verbose: true,
  };