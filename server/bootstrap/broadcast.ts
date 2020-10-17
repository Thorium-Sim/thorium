const bonjour = require("bonjour")();

function publishBonjour(port = 4444, httpOnly: boolean, tryCount = 0) {
  try {
    bonjour.publish({
      name: `Thorium${tryCount ? ` (${tryCount})` : ""}`,
      type: "http",
      port: port,
      txt: {https: String(process.env.NODE_ENV === "production" && !httpOnly)},
    });
  } catch {
    // Thorium is likely already running on the network. Do it again with a higher try count.
    publishBonjour(port, httpOnly, tryCount + 1);
  }
}

export default publishBonjour;
