const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: "./",
        assetModuleFilename: 'images/[name][ext][query]'
    },
    devServer: {
        static: './src'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: './index.html' //relative to root of the application
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
        })
   ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(?:ico|jpg|jpeg|png|gif|svg)$/i, 
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
              },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin()
        ]
    }
}