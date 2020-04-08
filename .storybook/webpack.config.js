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

  const fileLoaderRule = config.module.rules.find(rule =>
    rule.test.test(".svg"),
  );
  fileLoaderRule.exclude = path.resolve(__dirname, "../src/**/*.svg");

  config.module.rules.push({
    test: /\.svg$/,
    include: path.resolve(__dirname, "../src/**/*.svg"),
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
        },
      },
    ],
  });

  return config;
};
