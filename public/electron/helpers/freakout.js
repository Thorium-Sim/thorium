var robot = require("robotjs");
module.exports = function() {
  var screenSize = robot.getScreenSize();
  var height = screenSize.height;
  var width = screenSize.width;
  var counter = 0;

  // Speed up the mouse.
  robot.setMouseDelay(2);

  moveMouse();
  function moveMouse() {
    counter++;
    if (counter > 10) return;
    const x = Math.random() * width;
    const y = Math.random() * height;
    robot.moveMouse(x, y);
    setTimeout(moveMouse, 20);
  }
};
