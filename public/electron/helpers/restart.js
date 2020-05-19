var cp = require("child_process");

module.exports = function (cb) {
  if (
    process.platform !== "linux" &&
    process.platform !== "darwin" &&
    process.platform !== "win32"
  ) {
    throw new Error("Unknown or unsupported OS!");
  }

  let cmd = "shutdown -r";

  if (process.platform === "linux" || process.platform === "darwin") {
    cmd = "sudo " + cmd;
  }

  if (process.platform === "win32") {
    cmd = cmd + " -f";
  }

  cp.exec(cmd, function (err, stdout, stderr) {
    cb(err, stdout, stderr);
  });
};
