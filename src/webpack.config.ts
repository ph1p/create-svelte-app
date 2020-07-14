import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import autoPreprocess from 'svelte-preprocess';

let mode = process.env.NODE_ENV || 'development';

export default (cb, customConfig) => {
  const { title, customElement, ...config } = customConfig;

  if (config.mode) {
    mode = config.mode;
  }

  const prod = mode === 'production';

  return cb({
    mode,
    entry: [],
    optimization: prod
      ? {
        minimize: true,
        minimizer: [new TerserPlugin()],
      }
      : {},
    resolveLoader: {
      modules: [path.resolve(__dirname, './node_modules'), path.resolve(process.cwd(), './node_modules')],
    },
    resolve: {
      extensions: ['.mjs', '.js', '.svelte'],
      modules: [path.resolve(__dirname, './node_modules'), path.resolve(process.cwd(), './node_modules')],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|svelte)$/,
          exclude: /(node_modules|public)/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev: !prod,
              customElement: customConfig.customElement,
              preprocess: autoPreprocess({}),
              emitCss: true,
              hotReload: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        minify: true,
        templateContent: `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta charset="utf-8" />
    <title>${customConfig.title}</title>
  </head>

  <body></body>
  ${
          customConfig.customElement
            ? `<script>
    if (typeof customElements === 'undefined') {
      document.body.innerHTML = '<p>This browser does not support custom elements. See <a href="https://caniuse.com/#feat=custom-elementsv1">caniuse.com</a> for the gory details.</p>';
    }
  </script>`
            : ''
          }
</html>
        `,
      }),
    ],
    devtool: prod ? false : 'source-map',
  });
};
