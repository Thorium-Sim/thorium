const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = async ({config, mode}) => {
  config.module.rules.push({
    test: /\.(obj|ogg|mov)(\?.*)?$/,
    loader: "./node_modules/file-loader/dist/cjs.js",
    query: {name: "static/media/[name].[hash:8].[ext]"},
  });
  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: "graphql-tag/loader",
  });
  return config;
};
