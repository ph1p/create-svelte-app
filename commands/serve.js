const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const createWebpackConfig = require('../utils/create-webpack-config');

module.exports = (filepath, { mode }) => {
  if (!fs.existsSync(filepath)) {
    console.error('Please make sure "' + filepath + '" exists!');
    return;
  }
  const config = createWebpackConfig(filepath, {
    mode,
  });

  const devOptions = {
    hot: true,
    host: 'localhost',
    port: 3000,
    noInfo: true,
    watchContentBase: true,
    compress: true,
    contentBase: path.resolve(process.cwd(), 'dist'),
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
