// Analytics Package
const appId =
  process.env.NODE_ENV === "production" ? "2199408372" : "2377524477";
let heap = require("heap-api")(appId);

export default heap;
