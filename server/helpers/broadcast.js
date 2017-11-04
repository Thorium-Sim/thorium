const bonjour = require("bonjour")();

bonjour.publish({ name: "Thorium", type: "http", port: 3000 });
