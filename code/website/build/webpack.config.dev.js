"use strict";
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const utils = require("./utils");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "../"),
  entry: ["regenerator-runtime/runtime", "./src/main.js"],
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },
  devtool: config.dev.devtool,
  devServer: {
    client: {
      overlay: true,
      logging: "warn",
      progress: true,
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    devMiddleware: {
      publicPath: config.dev.assetsPublicPath,
    },
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,

    proxy: config.dev.proxyTable,
  },
  watchOptions: {
    poll: config.dev.poll,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: "static",
        },
      ],
    }),
  ],
};
