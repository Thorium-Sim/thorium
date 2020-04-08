const path = require("path");

module.exports = {
  ...require("./jest.common.js"),
  displayName: "client",
  coverageDirectory: path.join(__dirname, "../coverage/client"),
  setupFiles: ["react-app-polyfill/jsdom", "webgl-mock-threejs"],
  setupFilesAfterEnv: [require.resolve("./setupTests.js")],
  testEnvironment: "jest-environment-jsdom-fourteen",
  testMatch: [
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
  ],
  transformIgnorePatterns: ["node_modules/three"],
};
