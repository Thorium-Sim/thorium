if (typeof require.context === "undefined") {
  const fs = require("fs");
  const path = require("path");

  require.context = (
    base = ".",
    scanSubDirectories = false,
    regularExpression = /\.js$/
  ) => {
    const files = {};

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach(file => {
        const fullPath = path.resolve(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);

          return;
        }

        if (!regularExpression.test(fullPath)) return;

        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(__dirname, base));

    function Module(file) {
      return require(file);
    }

    Module.keys = () => Object.keys(files);

    return Module;
  };
}

function importAll(r) {
  return r
    .keys()
    .map(k => ({ path: k, image: r(k) }))
    .reduce((prev, next) => {
      const key = next.path.replace("./", "").replace(".svg", "");
      prev[key] = next.image;
      return prev;
    }, {});
}

const images = importAll(
  require.context("./parts", false, /\.(png|jpe?g|svg|JPE?G|PNG|SVG)$/)
);

export default images;
