import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import createWebpackConfig from '../utils/create-webpack-config';

export const serveCommand = (entry = './src/main.js', { mode, props, port, title }) => {
  entry = path.resolve(process.cwd(), entry);

  if (
    !fs.existsSync(entry) ||
    (entry.indexOf('.svelte') === -1 && entry.indexOf('.js') === -1)
  ) {
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

  let config = createWebpackConfig(
    entry,
    {
      mode,
      title,
    },
    propsObj
  );

  const devOptions = {
    port,
    host: 'localhost',
    noInfo: true,
    watchContentBase: true,
    compress: true,
    contentBase: path.resolve(process.cwd(), './dist'),
    stats: {
      all: false,
    },
  };

  webpackDevServer.addDevServerEntrypoints(config, devOptions);

  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, devOptions);

  server.listen(devOptions.port);

  console.log(
    `\nSvelte app runs on port http://localhost:${devOptions.port} !\n`
  );
};
