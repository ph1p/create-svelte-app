const webpack = require("webpack");
const createWebpackConfig = require("../utils/create-webpack-config");

module.exports = (cmd, { mode }) => {
  if (!cmd) {
    cmd = "./src/main.js";
  }

  const config = createWebpackConfig(cmd, {
    mode
  });

  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log("Error");
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
};
