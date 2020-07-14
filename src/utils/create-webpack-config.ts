import fs from 'fs';
import path from 'path';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import webpackConfig from '../webpack.config';

export default (entry, customConfig: any = {}, props) => {
  let isSvelteFile = entry && entry.indexOf('.svelte') >= 0;
  let svelteAlias = {};
  let plugins: any[] = [];
  let sveltePath = path.resolve(__dirname, '../node_modules/svelte/');;

  console.log('Entry:', entry);

  // if is svelte file
  if (isSvelteFile) {
    svelteAlias = {
      'create-svelte-app-entry-point$': path.resolve(process.cwd(), entry),
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

  if (fs.existsSync(sveltePath)) {
    sveltePath = path.resolve(__dirname, '../../../node_modules/svelte/');
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
          sveltePath,
        },
      },
    }),
    customConfig
  );
};
