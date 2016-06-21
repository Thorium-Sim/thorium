var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");

module.exports = {
	entry: ["./web/static/less/app.less", "./web/static/js/app.js"],
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
			test: /\.less$/,
			loader: "style!css!less"
		}]
	},
	plugins: [
	new ExtractTextPlugin("css/app.css"),
	new CopyWebpackPlugin([{ from: "./web/static/assets" }])
	],
	devtool: 'eval-source-map',
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: [ "node_modules", __dirname + "/web/static/js" ]
	}
};
