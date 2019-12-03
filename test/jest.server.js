const path = require("path");

module.exports = {
  ...require("./jest.common.js"),
  displayName: "server",
  coverageDirectory: path.join(__dirname, "../coverage/server"),
  setupFilesAfterEnv: [require.resolve("./setupServerTests.js")],
  testEnvironment: "jest-environment-node",
  testMatch: [
    "<rootDir>/server/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "<rootDir>/server/**/__tests__/**/*.{js,jsx,ts,tsx}",
  ],
};
