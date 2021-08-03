import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import createWebpackConfig from '../utils/create-webpack-config';

export const buildCommand = (
  entry = './src/main.js',
  { mode, props, title, customElement }
) => {
  entry = path.resolve(process.cwd(), entry);

  if (entry && !fs.existsSync(entry) && entry.indexOf('.svelte') === -1) {
    console.error('Please make sure your entry exists (.js or .svelte)!');
    return;
  }

  let propsObj;

  if (props && typeof props === 'string') {
    try {
      propsObj = JSON.parse(props);
    } catch (_) {
      console.log('Could not parse props json string');
    }
  }

  const config = createWebpackConfig(
    entry,
    {
      mode,
      title,
      customElement,
    },
    propsObj
  );

  webpack(config, (err, stats) => {
    if (err || (stats && stats.hasErrors())) {
      console.log('Error');
    }

    if (stats) {
      console.log(
        stats.toString({
          chunks: false,
          colors: true,
          entrypoints: false,
          children: false,
          modules: false,
        })
      );
    }
  });
};
