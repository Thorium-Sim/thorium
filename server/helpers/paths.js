const fs = require("fs");

if (!fs.existsSync(`${require("os").homedir()}/Documents`)) {
  fs.mkdirSync(`${require("os").homedir()}/Documents`);
}

const paths = {
  userData: `${require("os").homedir()}/Documents/thorium`,
};

module.exports = paths;
