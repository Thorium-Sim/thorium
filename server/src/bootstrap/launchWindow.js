const ipaddress = require("../helpers/ipaddress");
const libui = require("libui-node");
const openBrowser = require("react-dev-utils/openBrowser");
// openBrowser(`http://${ipaddress.default}:${port}`);

export default function launchWindow(port) {
  const menu = new libui.UiMenu("File");
  menu.appendQuitItem();

  // Have to
  const window = new libui.UiWindow("Thorium", 350, 200, true);

  var str = new libui.AttributedString("");
  str.appendAttributed(
    "Welcome to Thorium\n\n",
    libui.FontAttribute.newSize(30),
    libui.FontAttribute.newColor(new libui.Color(255, 255, 255, 1))
  );

  str.appendAttributed(
    "Connect clients by navigating to this address:\n",
    libui.FontAttribute.newSize(16),
    libui.FontAttribute.newColor(new libui.Color(255, 255, 255, 1))
  );

  str.appendAttributed(
    `\nhttp://${ipaddress.default}:${port}/client`,
    libui.FontAttribute.newSize(24),
    libui.FontAttribute.newColor(new libui.Color(255, 255, 255, 1))
  );

  const area = new libui.UiArea(
    function draw(area, p) {
      const brush = new libui.DrawBrush();
      brush.color = new libui.Color(0.1, 0, 0.18, 1);
      brush.type = libui.brushType.solid;

      const path = new libui.UiDrawPath(libui.fillMode.winding);
      path.addRectangle(0, 0, p.getAreaWidth(), p.getAreaHeight());
      path.end();
      p.getContext().fill(path, brush);
      path.freePath();

      const font = new libui.FontDescriptor(
        "Helvetica",
        14,
        libui.textWeight.normal,
        libui.textItalic.normal,
        libui.textStretch.normal
      );

      const layout = new libui.DrawTextLayout(
        str,
        font,
        p.getAreaWidth(),
        libui.textAlign.center
      );

      p.getContext().text(0, 0, layout);
    },
    function mouseEvent() {},
    function mouseCrossed() {},
    function dragBroken() {},
    function keyEvent() {}
  );

  const wrapper = new libui.UiVerticalBox();
  wrapper.append(area, true);
  const button = new libui.UiButton();
  button.setText("Open Core in Web Browser");
  button.onClicked(() => openBrowser(`http://${ipaddress.default}:${port}`));
  wrapper.append(button, false);
  window.setChild(wrapper);

  //window.setChild(widget);

  window.onClosing(() => {
    libui.stopLoop();
    process.exit();
  });
  libui.onShouldQuit(() => {
    window.close();
    libui.stopLoop();
    process.exit();
  });

  window.show();
  // Have to reset the timing functions
  const setTimeoutNode = global.setTimeout;
  const clearTimeoutNode = global.clearTimeout;
  const setIntervalNode = global.setInterval;
  const clearIntervalNode = global.clearInterval;

  libui.startLoop();
  global.setTimeout = setTimeoutNode;
  global.clearTimeout = clearTimeoutNode;
  global.setInterval = setIntervalNode;
  global.clearInterval = clearIntervalNode;
}
