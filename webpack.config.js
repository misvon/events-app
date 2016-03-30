var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path:  __dirname + "/dist",
    filename: 'events.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      ON_TEST: process.env.NODE_ENV === "test",
      ON_PRODUCTION: process.env.NODE_ENV === "production",
      ON_DEVELOPMENT: process.env.NODE_ENV === "development"
    })
  ],
  module: {
    loaders: [
                  { test: /\.html$/, loader: 'raw'},
                  { test: /\.js?$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel?presets=es2015'] },
                  { test: /\.css$/, loader: 'style-loader!css-loader' },
                  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
                  { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
                  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
                  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
                  { test: /\.json$/, loader: 'json' }
  ]
  }
};
switch(process.env.NODE_ENV){
  case "production":
  config.output.path = __dirname + "/dist";
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  break;
  case "development":
  config.output.path = __dirname + "/dist";
  config.devtool = 'source-map';
}

module.exports = config;
