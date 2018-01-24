const bonjour = require("bonjour")();

export default function(port = 3000) {
  bonjour.publish({
    name: require("os").hostname,
    type: "thorium-http",
    port
  });
}
