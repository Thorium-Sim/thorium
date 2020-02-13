// Module to control application life.
const startApp = require("./electron/helpers/startApp");
// Module to create native browser window.
startApp();

process.stdin.resume(); //so the program will not close instantly
process.on("unhandledRejection", err => {
  console.log("Unhandled Rejection:", err);
  //process.exit(1);
});
