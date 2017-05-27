var express = require('express'),
port = process.env.PORT || 3000,
path = require('path'),
electron = require('electron'),
server = express();

server.use(express.static(path.resolve(process.resourcesPath)+'/app'));

let assetDir = path.resolve('../assets/');
if (electron.app) {
  assetDir = path.resolve(electron.app.getPath('appData') + "/thorium/assets");
}

server.use('/assets/', express.static(assetDir));


server.get('*', function(request, response){
  response.sendfile(`${process.resourcesPath}/app/index.html`);
});

server.listen(port);
console.log("Client server started on port " + port);

export default server;