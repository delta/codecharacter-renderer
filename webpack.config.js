const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/javascripts/driver.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/javascripts/'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?optional=runtime&cacheDirectory',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: './src'
  }
};
