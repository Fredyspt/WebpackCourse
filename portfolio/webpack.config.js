const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    // path.resolve gives the absolute path of project in the OS, and 
    // outputs everything on the dist folder
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    // files that webpack will read
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 
        'css-loader', 
        'sass-loader'
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            // Enables or disables file transformation of base64
            limit: 10000,
            // (Multipurpose Internet Mail Extensions)
            // Standard way of sending content through the network
            mimetype: "application/font-woff",
            // Initial name + extension
            name: "[name].[ext]", 
            outputPath: "./assets/fonts/",
            publicPath: "./assets/fonts/",
            esModule: false
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, 
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"), 
          to: "assets/images"
        }
      ]
    })
  ]
};
