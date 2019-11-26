const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
