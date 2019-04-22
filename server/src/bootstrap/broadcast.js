const bonjour = require("bonjour")();

export default function(port = 3000) {
  bonjour.publish({
    name: `Thorium-${require("os").hostname()}`,
    type: "thorium-http",
    port: port
  });
}
