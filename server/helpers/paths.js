const AppDirectory = require("appdirectory");
const paths = new AppDirectory({
  appName: "thorium",
  appAuthor: "Fyreworks LLC"
});
paths.userData = paths._userDataTemplate
  .replace("{0}", "thorium")
  .replace("/{1}", "");
module.exports = paths;
