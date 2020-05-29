const path = require("path");
module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
