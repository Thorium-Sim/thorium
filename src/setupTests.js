require("jest-localstorage-mock");
const WebSocket = require("ws");

global.WebSocket = WebSocket;
