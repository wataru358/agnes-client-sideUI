var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
 'redux-thunk'
];
const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      /*{
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }*/
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules=true&localIdentName=[local]___[hash:base64:5]',
        }),
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          //loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]',
          loaders: ['url-loader?limit=40000',
                    {
                      loader: 'image-webpack-loader',
                      query: {
                        progressive: true,
                        optimizationLevel: 4,
                        interlaced: false,
                        optipng: {
                          optimizationLevel: 4,
                        },
                        pngquant: {
                          quality: '75-90',
                          speed: 3,
                        },
                      },
                    }],
                    exclude: /node_modules/,
                    include: __dirname,
        }

    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      // 'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
if (process.env.NODE_ENV === 'production') {

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    )
} else {// @todo: hotreload or chunkhash, that is the question.
    // actually we can do both

    config.output = {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
module.exports = config;
