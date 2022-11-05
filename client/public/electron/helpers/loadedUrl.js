let loadedUrl = null;

module.exports.setLoadedUrl = function (url) {
  loadedUrl = url;
};

module.exports.getLoadedUrl = function () {
  return loadedUrl;
};
