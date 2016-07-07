var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");

module.exports = {
	entry: ["./web/static/scss/app.scss", "./web/static/js/app.js"],
	output: {
		path: "./priv/static/js",
		filename: "app.js",
		sourceMapFilename: "app.js.map",
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ["babel"],
			include: path.resolve("./web/static/js")
		},{
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		},
		{
			test: /\.(png|jpg)$/,
			loader: 'file-loader?name=images/[name].[ext]'
		},
		{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		},
		{
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader"
		},
		]
	},
	plugins: [
	new ExtractTextPlugin("css/app.css"),
	new CopyWebpackPlugin([{ from: "./web/static/assets" }]),
	new webpack.ProvidePlugin({
		'Promise': 'es6-promise',
		'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	})
	],
	devtool: 'eval-source-map',
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: [ "node_modules", __dirname + "/web/static/js" ]
	}
};
