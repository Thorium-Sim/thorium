import getPath from "platform-folders";
const AppDirectory = require("appdirectory");
const oldpaths = new AppDirectory({
  appName: "thorium",
  appAuthor: "Fyreworks LLC"
});

const paths = {
  userData: `${getPath("documents")}/thorium`,
  oldData: oldpaths._userDataTemplate
    .replace("{0}", "thorium")
    .replace("/{1}", "")
    .replace("\\{1}", "")
};

module.exports = paths;
