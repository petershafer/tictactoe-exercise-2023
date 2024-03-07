const path = require('path');

module.exports = {
  entry: './src/browser.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'serve'),
    filename: 'tictactoe.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'serve'),
    },
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
