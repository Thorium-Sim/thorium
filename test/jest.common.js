const path = require("path");

module.exports = {
  rootDir: path.join(__dirname, "../"),
  setupFilesAfterEnv: [],

  transform: {
    "^.+\\.(gql|graphql)$": "@jagi/jest-transform-graphql",
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/test/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/test/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/packages/"],
  watchPathIgnorePatterns: ["/node_modules/", "<rootDir>/packages/"],
  modulePaths: ["./src", "./server"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "firebase-admin/*": "node_modules/firebase-admin/lib/*",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
    "jest-watch-select-projects",
  ],
};
