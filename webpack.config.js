const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [HtmlWebpackPluginConfig]
}
