const path = require('path');
const fs = require('fs');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const webpackConfig = require('../webpack.config');
const { alias } = require('commander');

module.exports = (entry, customConfig = {}, props) => {
  let isSvelteFile = entry && entry.indexOf('.svelte') >= 0;
  let svelteAlias = {};

  plugins = [];

  console.log('Entry:', entry);

  // if is svelte file
  if (isSvelteFile && !fs.existsSync('./main.js')) {
    svelteAlias = {
      'create-svelte-app-entry-point': path.resolve(process.cwd(), entry),
    };

    entry = './entry.js';
    plugins.push(
      new VirtualModulesPlugin({
        './entry.js': `import App from "create-svelte-app-entry-point";
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
          ...svelteAlias,
          svelte: path.resolve(__dirname, '../node_modules/svelte'),
        },
      },
    }),
    customConfig
  );
};
