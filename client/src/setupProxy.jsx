const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(proxy("/assets", {target: "http://localhost:3001"}));
  app.use(
    proxy(
      pathname => {
        return pathname.match(/^\/(export|import).*/gm);
      },
      {target: "http://localhost:3001"},
    ),
  );
  app.use(proxy("/upload", {target: "http://localhost:3001"}));
};
