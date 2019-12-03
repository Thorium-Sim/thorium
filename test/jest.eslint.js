const {rootDir} = require("./jest.common");

module.exports = {
  rootDir,
  runner: "jest-runner-eslint",
  displayName: "lint",
  testMatch: ["<rootDir>/**/*.{js,jsx,ts,tsx}"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "/build/",
    "/server/build/",
    "/.cache/",
    "/locales/",
    "/src/models/",
  ],
};
