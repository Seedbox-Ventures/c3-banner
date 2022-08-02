/* eslint-disable import/no-extraneous-dependencies */
import { merge } from "webpack-merge";

import baseConfFactory from "../webpack.config.js";
import envFactory from "./environment.js";

export default () => {
  const environment = envFactory();
  return merge(baseConfFactory(environment), {
    mode: "development",

    /* Manage source maps generation process */
    devtool: "eval-source-map",

    /* Development Server Configuration */
    devServer: {
      static: [
        {
          directory: environment.paths.output,
          publicPath: "/",
          watch: true,
        },
        {
          directory: environment.paths["dev-js"],
          publicPath: "/js",
          watch: true,
        },
      ],
      client: {
        overlay: true,
      },
      open: true,
      compress: true,
      hot: true,
      ...environment.server,
    },

    /* File watcher options */
    watchOptions: {
      aggregateTimeout: 300,
      poll: 300,
      ignored: /node_modules/,
    },

    /* Additional plugins configuration */
    plugins: [],
  });
};
