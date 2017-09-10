let webpack = require('webpack')
const {resolve, join} = require('path')
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
    entry: resolve(join('src', 'server', 'server.js')),
    output: {
      path: resolve('dist'),
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
          loader: 'babel-loader'
        },
        {
          test: /\.css|scss$/,
          loader: 'ignore-loader'
        },
        {
          test: /\.c$/,
          loader: 'file-loader',
          options: {
            name: 'code/[name].[ext]'
          }
        }
      ].concat(commonLoaders)
    }
  },
  {
    entry: resolve(join('src', 'client', 'browser.js')),
    output: {
      path: resolve(join('dist', 'assets')),
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
          include: resolve('src'),
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.c$/,
          loader: 'file-loader',
          options: {
            name: 'code/[name].[ext]'
          }
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ].concat(commonLoaders)
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    }
  }
]
