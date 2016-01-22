var webpack = require('webpack');
var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: './src/index.jsx',
    exclude: /node_modules/,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015' ]
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015', 'react' ]
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-wolf'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    plugins: [
        new HtmlPlugin({
            minify: { },
            title: 'YOU BETTER',
            bodyContent: '',
            template: './src/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};

module.exports = config;
