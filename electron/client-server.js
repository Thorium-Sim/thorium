var express = require('express'),
port = process.env.PORT || 3000,
path = require('path'),
server = express();
const { app } = require('electron')


server.use(express.static(path.resolve(process.resourcesPath)+'/app'));

server.get('*', function(request, response){
  response.sendfile(`${process.resourcesPath}/app/index.html`);
});

server.listen(port);
console.log("Client server started on port " + port);

export default server;