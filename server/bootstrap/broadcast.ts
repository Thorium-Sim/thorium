const bonjour = require("bonjour")();

export default function(port = 443, httpOnly) {
  bonjour.publish({
    name: `Thorium-${require("os").hostname()}`,
    type: "thorium-http",
    port: port,
    txt: {https: String(process.env.NODE_ENV === "production" && !httpOnly)},
  });
}
