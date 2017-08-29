var path = require("path");
var webpack = require("webpack");
var chalk = require("chalk");
var config = require("../config/webpack.config.server");
var fs = require("fs");
var exec = require("child_process").exec;

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

console.log("Creating an optimized production server build...");
webpack(config).run((err, stats) => {
  if (err) {
    printErrors("Failed to compile.", [err]);
    process.exit(1);
  }
  if (stats.compilation.errors.length) {
    printErrors("Failed to compile.", stats.compilation.errors);
    process.exit(1);
  }

  console.log(chalk.green("Compiled successfully."));
  console.log();
});
