const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/assets", {target: "http://localhost:3001"}));
  app.use(proxy("/exportMission", {target: "http://localhost:3001"}));
  app.use(proxy("/exportSimulator", {target: "http://localhost:3001"}));
  app.use(proxy("/exportKeyboard", {target: "http://localhost:3001"}));
  app.use(proxy("/exportTacticalMap", {target: "http://localhost:3001"}));
  app.use(proxy("/exportSoftwarePanel", {target: "http://localhost:3001"}));
  app.use(proxy("/exportFlight", {target: "http://localhost:3001"}));
  app.use(proxy("/exportTrigger", {target: "http://localhost:3001"}));
  app.use(proxy("/exportSurvey", {target: "http://localhost:3001"}));
  app.use(proxy("/exportCoreLayout", {target: "http://localhost:3001"}));
  app.use(proxy("/importSimulator", {target: "http://localhost:3001"}));
  app.use(proxy("/importMission", {target: "http://localhost:3001"}));
  app.use(proxy("/importKeyboard", {target: "http://localhost:3001"}));
  app.use(proxy("/importTacticalMap", {target: "http://localhost:3001"}));
  app.use(proxy("/importAssets", {target: "http://localhost:3001"}));
  app.use(proxy("/importSoftwarePanel", {target: "http://localhost:3001"}));
  app.use(proxy("/importFlight", {target: "http://localhost:3001"}));
  app.use(proxy("/importTrigger", {target: "http://localhost:3001"}));
  app.use(proxy("/importSurvey", {target: "http://localhost:3001"}));
  app.use(proxy("/importCoreLayout", {target: "http://localhost:3001"}));
  app.use(proxy("/exportLibrary", {target: "http://localhost:3001"}));
  app.use(proxy("/exportLibrary", {target: "http://localhost:3001"}));
  app.use(proxy("/importLibrary", {target: "http://localhost:3001"}));
  app.use(proxy("/upload", {target: "http://localhost:3001"}));
};
