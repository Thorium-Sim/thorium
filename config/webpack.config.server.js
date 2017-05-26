var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var ManifestPlugin = require('webpack-manifest-plugin');


var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  target: 'node',
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  // In production, we only want to load the polyfills and the app code.
  entry: [
    path.resolve(__dirname + '/../electron/electronApp.js')
  ],
  output: {
    // The build folder.
    path: path.resolve(__dirname + '/../build-server'),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'app.js',
  },
  externals: nodeModules,
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
    // We use `fallback` instead of `root` because we want `node_modules` to "win"
    // if there any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx'],
  },
  
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    loaders: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        //include: path.resolve(__dirname + '../server/'),
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        //include: path.resolve(__dirname + '../server/'),
        loader: 'babel-loader',
        
      },
    ]
  },
  
  plugins: [
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
  ],
};
