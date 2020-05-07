// Most of this was copied out of create-react-app
module.exports = {
  ...require("./test/jest.common.js"),
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "server/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!server/**/*.d.ts",
    "!src/models/**/*.base.ts",
    "!src/models/**/reactUtils.ts",
    "!src/stories/**",
    "!src/mocks/**",
    "!src/translations/**",
    "!src/**/*.test.js",
    "!src/**/*.test.ts",
    "!**/__tests__/**",
    "!**/build/**",
  ],
  projects: ["./test/jest.client.js", "./test/jest.server.js"],
};
