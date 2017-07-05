var webpack = require('webpack'),
    path = require('path'),
    WebpackStripLoader = require('strip-loader'),
    externals = require('webpack-node-externals')
    stripLoader = {
     test: [/\.js$/, /\.es6$/],
     exclude: /node_modules/,
     loader: WebpackStripLoader.loader('console.log')
    }

module.exports = {
  entry: [
    './app/index.js'
  ],
  resolve: {
    alias: {
      joi: 'joi-browser'
    }
  },
  loaders: [
    stripLoader
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  target: 'node',
  externals: [externals()],
  output: {
    path: __dirname + '/dist',
    filename: "index.compiled.js"
  },
  module: {
    devtool: "source-map", // or "inline-source-map"
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, 'app')],
        loader: "babel-loader",
        query: {
            presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}