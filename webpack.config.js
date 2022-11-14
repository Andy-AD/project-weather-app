/* global require, module, __dirname */
/* eslint no-undef: "error" */

const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: 'inline-source-map',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: {
      keep: /index\.html$/i
  }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
