const bonjour = require("bonjour")();

export default function(port = 3000) {
  bonjour.publish({
    name: "Thorium",
    type: "thorium-http",
    port: port
  });
}
