var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');

var plugins = [];
var js_loaders = ['babel-loader'];

if (process.env.NODE_ENV == "production") {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));
  plugins.push(new webpack.optimize.DedupePlugin());
  // plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: false}));
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify("production")
  }));
} else {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify("development")
  }));
  js_loaders.unshift('react-hot');
}

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: js_loaders
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: plugins,
  devServer: {
    contentBase: './client',
    hot: true
  }
}
