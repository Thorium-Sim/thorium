var packager = require('electron-packager')
var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk');
var config = require('../config/webpack.config.server');
var fs = require('fs');
var exec = require('child_process').exec;

var electronOptions = {
  dir: path.resolve(__dirname + '/../build-server'),
  appCopyright: "Copyright 2017 Alex Anderson. All Rights Reserved",
  asar: false,
  icon: path.resolve(__dirname + '/../electron/icon.icns'),
  name: 'Thorium Server',
  out: path.resolve(__dirname + '/..'),
  overwrite: true,
  appBundleId: 'com.alexanderson.thoriumserver',
  appCategoryType: 'public.app-category.entertainment',
  electronVersion: '1.6.8'
}

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
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


console.log('Creating an optimized production server build...');
webpack(config).run((err, stats) => {
  if (err) {
    printErrors('Failed to compile.', [err]);
    process.exit(1);
  }
  if (stats.compilation.errors.length) {
    printErrors('Failed to compile.', stats.compilation.errors);
    process.exit(1);
  }
  
  console.log(chalk.green('Compiled successfully.'));
  console.log();

  //Copy some files over
  fs.createReadStream('./electron/package-lite.json').pipe(fs.createWriteStream(path.resolve(__dirname + "/../build-server/package.json")));
  fs.createReadStream('./electron/electronIndex.html').pipe(fs.createWriteStream(path.resolve(__dirname + "/../build-server/index-server.html")));
  fs.createReadStream('./electron/background.jpeg').pipe(fs.createWriteStream(path.resolve(__dirname + "/../build-server/background.jpeg")));


  process.chdir('./build-server');
  console.log('Installing Deps');
  exec('npm install', function(){
    process.chdir('../');
    packager(electronOptions, function done_callback (err, appPaths) {
      if (err) {
        throw new Error(err);
      }
      console.log('Electron app successfully packaged.')
      console.log(appPaths);
    })
  })
})