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
    loaders: [{
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel?presets=es2015'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'raw'
    }, {
      test: /\.css$/,
      loader: 'style!css!sass'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loader: "style!css!sass"
    }]
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
