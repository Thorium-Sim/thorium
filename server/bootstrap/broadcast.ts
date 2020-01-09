const bonjour = require("bonjour")();

export default function(port = 443, https) {
  bonjour.publish({
    name: `Thorium-${require("os").hostname()}`,
    type: "thorium-http",
    port: port,
    txt: {https},
  });
}
