const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const {NODE_ENV} = process.env;
const publicServerAppSrcDir = path.resolve(__dirname, "./src/public-server-app");
const publicClientAppSrcDir = path.resolve(__dirname, "./src/public-client-app");
const config = require(publicServerAppSrcDir + "/public-server.setting");

module.exports =
{
    entry: {
        app: publicClientAppSrcDir,
        vendor: [
            'react',
            'react-dom'
        ]
    },

    output: {
        path: config.publicDocRoot,
        filename: 'index.bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'sass-loader'}
                    ]
                })
            }
        ]
    },

    plugins: [
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        }),
        new ExtractTextPlugin('index.bundle.css')
    ],

    devtool: NODE_ENV === "development" ? 'inline-source-map' : false

};