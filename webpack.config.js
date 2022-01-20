const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: [
    "regenerator-runtime/runtime.js",
    path.join(__dirname, "src/index.js"),
  ],
  devServer: {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 8080,
    //needed to render pages with react router without going to the server
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  devtool: "inline-source-map",
  // mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Dev",
      template: path.join(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new Dotenv(),
  ],
};
