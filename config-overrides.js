const {
  override,
  addBabelPreset,
  removeInternalBabelPlugin,
} = require("customize-cra");
module.exports = override(
  addBabelPreset("@emotion/babel-preset-css-prop"),
  removeInternalBabelPlugin("babel-plugin-transform-react-inline-elements"),
);
