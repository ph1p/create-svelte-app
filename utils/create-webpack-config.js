const path = require('path');
const fs = require('fs');
const webpackConfig = require('../webpack.config');

module.exports = (entry, customConfig = {}) => {
  let isSvelteFile = entry && entry.indexOf('.svelte') >= 0;
  let svelteAlias = {};

  // if is svelte file
  if (isSvelteFile) {
    svelteAlias = {
      SvelteEntry: path.resolve(process.cwd(), entry),
    };

    if (!fs.existsSync(path.resolve(process.cwd(), './main.js'))) {
      entry = path.resolve(__dirname, '../main.js');
    } else {
      entry = path.resolve(process.cwd(), './main.js');
    }
  }

  return webpackConfig(
    (config) => ({
      ...config,
      entry: [...config.entry, entry],
      resolve: {
        ...config.resolve,
        alias: {
          ...svelteAlias,
          svelte: path.resolve(__dirname, '../node_modules/svelte'),
        },
      },
    }),
    customConfig
  );
};
