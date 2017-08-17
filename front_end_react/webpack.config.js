let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let nodeExternals = require('webpack-node-externals')

let isProduction = process.env.NODE_ENV === 'production'
let productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : []
let clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: false})
]) : []

let commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
]

module.exports = [
  {
    entry: './src/server/server.js',
    output: {
      path: './dist',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel'
        },
        {
          test: /\.css|scss$/,
          loader: 'ignore-loader'
        }
      ].concat(commonLoaders)
    }
  },
  {
    entry: './src/client/browser.js',
    output: {
      path: './dist/assets',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: clientLoaders.concat([
      new ExtractTextPlugin('index.css', {
        allChunks: true
      })
    ]),
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /\.scss|.css$/,
          loader: ExtractTextPlugin.extract('css!sass')
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    }
  }
]
