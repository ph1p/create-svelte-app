#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const webpackConfig = require('../webpack.config');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

yargs
  .usage('svelte <cmd> [args]')
  .command({
    command: '[options]',
    aliases: ['$0'],
    handler: argv => {
      let entry = argv.entry;
      let isSvelteFile = argv.entry && argv.entry.indexOf('.svelte') >= 0;
      let isDevServer = !argv.build;
      let port = argv.port || 3000;

      let svelteAlias = {};

      // if is svelte file
      if (isSvelteFile) {
        svelteAlias = {
          SvelteEntry: path.resolve(process.cwd(), entry)
        };

        if (!fs.existsSync(path.resolve(process.cwd(), './main.js'))) {
          entry = path.resolve(__dirname, '../main.js');
        } else {
          entry = path.resolve(process.cwd(), './main.js');
        }
      }

      const config = {
        ...webpackConfig,
        entry: [...webpackConfig.entry, entry],
        resolve: {
          ...webpackConfig.resolve,
          alias: {
            ...svelteAlias,
            svelte: path.resolve(__dirname, '../node_modules/svelte')
          }
        }
      };

      if (isDevServer) {
        const options = {
          hot: true,
          host: 'localhost',
          port,
          noInfo: true,
          watchContentBase: true,
          compress: true,
          contentBase: path.resolve(process.cwd(), 'dist'),
          stats: {
            all: false
          }
        };

        webpackDevServer.addDevServerEntrypoints(config, options);

        const compiler = webpack(config);
        const server = new webpackDevServer(compiler, options);

        server.listen(port);

        console.log(`\nSvelte app runs on port http://localhost:${port} !\n`);
      } else {
        webpack(config, (err, stats) => {
          if (err || stats.hasErrors()) {
            console.log('Error');
          }

          console.log(
            stats.toString({
              chunks: false,
              colors: true,
              entrypoints: false,
              children: false,
              modules: false
            })
          );
        });
      }
    },
    builder: yargs => {
      yargs.options({
        entry: {
          alias: 'e',
          default: './src/main.js',
          desc: 'Entry file',
          type: 'string'
        },
        port: {
          alias: 'p',
          default: 3000,
          desc: 'dev server port',
          type: 'number'
        },
        build: {
          alias: 'b',
          default: false,
          desc: 'build project',
          type: 'boolean'
        }
      });
    }
  })
  .alias('help', 'h')
  .alias('version', 'v').argv;
