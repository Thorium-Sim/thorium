const fs = require("fs");
// Loop through all of the cards
fs.readdirSync("./src/components/views")
  .map(f => ({path: `./src/components/views/${f}`, name: f}))
  .filter(f => {
    return fs.statSync(f.path).isDirectory();
  })
  .forEach((f, i) => {
    if (fs.existsSync(`${f.path}/index.stories.js`)) return;
    // Create an index.stories.js file inside of the views folder
    const component = fs.existsSync(`${f.path}/index.js`);
    const core = fs.existsSync(`${f.path}/core.js`);
    if (!component && !core) return;
    fs.writeFileSync(
      `./src/stories/${f.name}.stories.js`,
      `import React from 'react';
import StorybookWrapper from './storybookWrapper.js';
import baseProps from './baseProps.js';
${
  component
    ? `import Component from '../components/views/${f.name}/index.js';`
    : ""
}
${
  core
    ? `import CoreComponent from '../components/views/${f.name}/core.js';`
    : ""
}

export default {
  title: 'Cards|${f.name}',
};
${
  component
    ? `export const ${f.name} = () => <StorybookWrapper><Component {...baseProps} /></StorybookWrapper>;`
    : ""
}
${
  core
    ? `export const Core = () => <StorybookWrapper><CoreComponent {...baseProps} /></StorybookWrapper>`
    : ""
}
      `,
    );
  });
