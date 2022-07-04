/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const baseConfFactory = require("../webpack.config");
const envFactory = require("./environment");
const path = require("path");

module.exports = () => {
  const environment = envFactory();
  return merge(baseConfFactory(environment), {
    mode: "production",

    /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
    devtool: false,

    /* Optimization configuration */
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin(),
      ],
    },

    /* Performance treshold configuration values */
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    /* Additional plugins configuration */
    plugins: [],
  });
};
