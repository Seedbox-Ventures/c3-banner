/**
 * Webpack main configuration file
 */

const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (environment) => {
  const { application = "forum" } = environment;
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
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    plugins: [
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
