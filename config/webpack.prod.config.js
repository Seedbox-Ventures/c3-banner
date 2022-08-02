/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import { merge } from "webpack-merge";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import baseConfFactory from "../webpack.config.js";
import envFactory from "./environment.js";

export default () => {
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
