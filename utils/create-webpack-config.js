const path = require('path');
const fs = require('fs');
var VirtualModulesPlugin = require('webpack-virtual-modules');
const webpackConfig = require('../webpack.config');

module.exports = (entry, customConfig = {}, props) => {
  let isSvelteFile = entry && entry.indexOf('.svelte') >= 0;
  let svelteAlias = {};

  plugins = [];

  console.log('Entry:', entry);

  // if is svelte file
  if (
    isSvelteFile &&
    !fs.existsSync(path.resolve(process.cwd(), './main.js'))
  ) {
    const entryContent = fs.readFileSync(path.resolve(process.cwd(), entry), {
      encoding: 'utf-8',
    });

    entry = './entry.js';
    plugins.push(
      new VirtualModulesPlugin({
        './svelte-cli-entry.svelte': entryContent,
        './entry.js': `import App from "./svelte-cli-entry.svelte";
          ${
            customConfig.mode === 'production' && customConfig.customElement
              ? ''
              : `
          const app = new App({
            target: document.body,
            props: ${JSON.stringify(props)}
          });

          export default app;`
          }`,
      })
    );
  } else {
    entry = path.resolve(process.cwd(), entry);
  }

  return webpackConfig(
    (config) => ({
      ...config,
      entry: [...config.entry, entry],
      plugins: [...config.plugins, ...plugins],
      resolve: {
        ...config.resolve,
        alias: {
          svelte: path.resolve(__dirname, '../node_modules/svelte'),
        },
      },
    }),
    customConfig
  );
};
