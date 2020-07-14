import fs from 'fs';
import path from 'path';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import webpackConfig from '../webpack.config';

export default (entry, customConfig: any = {}, props) => {
  let isSvelteFile = entry && entry.indexOf('.svelte') >= 0;
  let plugins: any[] = [];
  let baseEntry = entry;
  let sveltePath = path.resolve(__dirname, '../node_modules/svelte/');

  console.log('Entry:', entry);

  // if is svelte file
  if (isSvelteFile) {
    entry = './entry.js';
    plugins.push(
      new VirtualModulesPlugin({
        './entry.js': `import App from "${path.resolve(process.cwd(), baseEntry)}";
        ${
          customConfig.mode === 'production' && customConfig.customElement
            ? ''
            : `const app = new App({
  target: document.body,
  props: ${JSON.stringify(props)}
});

export default app;`
          }`,
      })
    );
  }

  if (!fs.existsSync(sveltePath)) {
    sveltePath = path.resolve(__dirname, '../../node_modules/svelte/');
  }

  if (!fs.existsSync(sveltePath)) {
    sveltePath = path.resolve(__dirname, '../../../node_modules/svelte/');
  }

  return webpackConfig(
    (config) => ({
      ...config,
      entry: {
        bundle: entry
      },
      plugins: [...config.plugins, ...plugins],
      resolve: {
        ...config.resolve,
        alias: {
          svelte: sveltePath,
        },
      },
    }),
    {
      ...customConfig,
      entry: baseEntry
    }
  );
};
