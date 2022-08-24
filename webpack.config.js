/**
 * Webpack main configuration file
 */

import path from "path";
import fs from "fs";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const webpackConfig = function (environment) {
  const templateFiles = fs
    .readdirSync(environment.paths.templates)
    .filter((file) => path.extname(file).toLowerCase() === ".html");

  const htmlPluginEntries = templateFiles.map(
    (template) =>
      new HTMLWebpackPlugin({
        inject: true,
        hash: false,
        filename: template,
        template: path.resolve(environment.paths.templates, template),
      })
  );

  return {
    entry: {
      cookieConsent: path.resolve(environment.paths.source, "js", "index.js"),
    },
    output: {
      filename: "js/[name].js",
      path: environment.paths.output,
      environment: {
        arrowFunction: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // modules: false,
                    corejs: "3.6.4",
                    useBuiltIns: "usage",
                    targets: {
                      browsers: [
                        "edge >= 16",
                        "safari >= 9",
                        "firefox >= 57",
                        "ie >= 11",
                        "ios >= 9",
                        "chrome >= 49",
                      ],
                    },
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(
              environment.paths.source,
              "dev-assets",
              "js",
              "utils.js"
            ),
            to: path.resolve(
              environment.paths.output,
              "dev-assets",
              "js",
              "utils.js"
            ),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
      }),
    ].concat(htmlPluginEntries),
    resolve: {
      extensions: ["*", ".js", ".json"],
    },
    target: "web",
  };
};

export default webpackConfig;
