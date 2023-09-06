const path = require('path');

module.exports = {
  entry: './browser.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'serve'),
    filename: 'tictactoe.js',
  },
};