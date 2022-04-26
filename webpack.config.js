const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const port = process.env.PORT || 80;


module.exports = {
    mode: 'production',
    entry: path.resolve('src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index_bundle.js',
    },
    resolve: {
        alias: {
            assets: path.resolve('src/assets'),
        },
        extensions: ['.js', 'ts', 'tsx'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|ico|ttf)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            DEBUG: true,
        }),
    ],

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        // publicPath: '/',
        // contentBase: path.resolve('src'),
        //
        // hot: true,
        // inline: true,
        // clientLogLevel: 'debug',
        // writeToDisk: true,
        //
        // historyApiFallback: true,
        // disableHostCheck: true,
    },
    devtool: 'eval-source-map',
    optimization: {
        minimize: true,
    },
};
