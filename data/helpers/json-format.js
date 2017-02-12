let _fs;
try {
  _fs = require('graceful-fs');
} catch (_) {
  _fs = require('fs');
}

export function writeFile(file, obj, options = {}, callback = () => {}) {
  const fs = options.fs || _fs;


  let str = '';
  try {
    str = JSON.stringify(obj, null, '\t') + '\n';
  } catch (err) {
    if (callback) return callback(err, null);
  }
  fs.writeFile(file, str, options, callback);
  return null;
}
