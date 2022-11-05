const {
  override,
  addBabelPreset,
  removeInternalBabelPlugin,
  addWebpackResolve,
} = require("customize-cra");
module.exports = override(
  addBabelPreset("@emotion/babel-preset-css-prop"),
  removeInternalBabelPlugin("babel-plugin-transform-react-inline-elements"),
  addWebpackResolve({
    fallback: {timers: false, stream: false},
  }),
);
