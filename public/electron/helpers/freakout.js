/*var robot = require("robotjs");
//console.log(process.version);
module.exports = function() {
  // Speed up the mouse.
  robot.setMouseDelay(2);

  var twoPI = Math.PI * 2.0;
  var screenSize = robot.getScreenSize();
  var height = screenSize.height;
  var width = screenSize.width;
  var counter = 0;
  
  moveMouse();
  function moveMouse() {
    counter ++;
    if (counter > 10) return;
    x = Math.random() * width;
    y = Math.random() * height;
    robot.moveMouse(x, y);
    setTimeout(moveMouse, 20);
  }
}
*/

module.exports = function() {};
