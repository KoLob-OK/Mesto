const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/pages/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    /*new CopyPlugin({
      patterns: [
        {
          from: "**!/!*",
          context: './images',
          to: "./images",
        },
      ],
    }),*/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|svg|png|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
