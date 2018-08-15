const AppDirectory = require("appdirectory");
const fs = require("fs");
const oldpaths = new AppDirectory({
  appName: "thorium",
  appAuthor: "Fyreworks LLC"
});

if (!fs.existsSync(`${require("os").homedir()}/Documents`)) {
  fs.mkdirSync(`${require("os").homedir()}/Documents`);
}

const paths = {
  userData: `${require("os").homedir()}/Documents/thorium`,
  oldData: oldpaths._userDataTemplate
    .replace("{0}", "thorium")
    .replace("/{1}", "")
    .replace("\\{1}", "")
};

module.exports = paths;
