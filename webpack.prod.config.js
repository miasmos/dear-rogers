var webpack = require('webpack'),
    path = require('path'),
    WebpackStripLoader = require('strip-loader'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
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
  output: {
    path: __dirname + '/dist',
    filename: "index.compiled.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /joi-browser/],
        include: [path.resolve(__dirname, 'app')],
        loader: "babel-loader",
        quersy: {
            presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CommonsChunkPlugin("commons.chunk.js"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.IgnorePlugin(/websocket/),
    new webpack.optimize.UglifyJsPlugin({
       output: {
          space_colon: false,
          comments: function(node, comment) {
              var text = comment.value;
              var type = comment.type;
              if (type == "comment2") {
                  // multiline comment
                  return /@copyright/i.test(text);
              }
          }
      }
    }),
  ]
};