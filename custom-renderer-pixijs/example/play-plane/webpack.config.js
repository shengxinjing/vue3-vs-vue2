const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: path.resolve(__dirname,"./index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
