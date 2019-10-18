const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "react-app",
    [
      "@babel/preset-typescript",
      {
        isTsx: true,
        allExtensions: false,
      },
    ],
  ].filter(Boolean),
  plugins: ["transform-node-env-inline", "import-glob"],
};
