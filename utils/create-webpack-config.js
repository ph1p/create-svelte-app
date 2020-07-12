const path = require('path');
const fs = require('fs');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const webpackConfig = require('../webpack.config');

module.exports = (entry, customConfig = {}, props) => {
  let isSvelteFile = entry && entry.indexOf('.svelte') >= 0;
  let svelteAlias = {};

  plugins = [];

  console.log('Entry:', entry);

  // if is svelte file
  if (isSvelteFile && !fs.existsSync('./main.js')) {
    const entryContent = fs.readFileSync(entry, {
      encoding: 'utf-8',
    });

    entry = './entry.js';
    plugins.push(
      new VirtualModulesPlugin({
        './svelte-cli-entry.svelte': entryContent,
        './entry.js': `import App from "CreateSvelteApp";
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
  }

  return webpackConfig(
    (config) => ({
      ...config,
      entry: [...config.entry, entry],
      plugins: [...config.plugins, ...plugins],
      resolve: {
        ...config.resolve,
        alias: {
          CreateSvelteApp: './svelte-cli-entry.svelte',
          svelte: path.resolve(__dirname, '../node_modules/svelte'),
        },
      },
    }),
    customConfig
  );
};
