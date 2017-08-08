const preval = 0;
const viewscreens = preval`
const fs = require('fs');
const path = require('path');
module.exports = fs.readdirSync('./src/components/viewscreens').filter(p => p.indexOf('.js') > -1 && p !== 'index.js')
.map(p => p.replace('.js',''))
`;

viewscreens.forEach(p => {
  const viewscreen = require("./" + p);
  if (viewscreen.default) {
    module.exports[p] = viewscreen.default;
  }
});
