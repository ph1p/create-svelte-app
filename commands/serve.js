const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const createWebpackConfig = require('../utils/create-webpack-config');

module.exports = (
  filepath = './src/main.js',
  { mode, props, port, title, html, customElement }
) => {
  if (
    filepath &&
    !fs.existsSync(filepath) &&
    filepath.indexOf('.svelte') === -1
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
    filepath,
    {
      mode,
      title,
      html,
      customElement,
    },
    propsObj
  );

  const devOptions = {
    port,
    hot: true,
    host: 'localhost',
    noInfo: true,
    clientLogLevel: 'silent',
    watchContentBase: true,
    compress: true,
    publicPath: path.resolve(process.cwd(), 'dist'),
    contentBase: path.resolve(process.cwd(), 'dist'),
  };

  webpackDevServer.addDevServerEntrypoints(config, devOptions);

  const compiler = webpack(config);
  const server = new webpackDevServer(compiler);

  server.listen(devOptions.port);

  console.log(`\nSvelte app started!\n`);
};
