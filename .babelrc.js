const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  presets: [
    "@babel/preset-env",
    isTest ? "react-app" : null,
    [
      "@babel/preset-typescript",
      {
        isTsx: true,
        allExtensions: true,
      },
    ],
  ].filter(Boolean),
  plugins: ["transform-node-env-inline", "import-glob"],
};
