const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {NODE_ENV} = process.env;
const adminClientAppSrcDir = path.resolve(__dirname, "./src/admin-client-app");
const adminServerAppSrcDir = path.resolve(__dirname, "./src/admin-server-app");
const config = require(adminServerAppSrcDir + "/admin-server.setting");

module.exports =
{
    entry: {
        app: adminClientAppSrcDir,
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-logger',
            'react-router-dom',
            'history',
            'whatwg-fetch'
        ]
    },

    output: {
        path: config.adminDocRoot,
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
        new DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(NODE_ENV)
                }
            }
        }),
        new ExtractTextPlugin('index.bundle.css')
    ],

    devtool: NODE_ENV === "development" ? 'inline-source-map' : false

};