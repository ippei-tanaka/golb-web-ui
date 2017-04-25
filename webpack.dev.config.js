const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;

const {NODE_ENV, GOLB_CONFIG} = process.env;
const cwd = process.cwd();
const config = JSON.parse(fs.readFileSync(path.resolve(cwd, GOLB_CONFIG || "config.json"), 'utf8'));

module.exports =
{
    entry: {
        app: "./src/admin-client-app",
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-logger',
            'react-router-dom',
            'history'
        ]
    },

    output: {
        path: path.resolve(cwd, config.adminDocRoot),
        publicPath: config.adminRoot,
        filename: 'index.bundle.js'
    },

    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/}
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
                    NODE_ENV: JSON.stringify(NODE_ENV),
                    ADMIN_ROOT: JSON.stringify(config.adminRoot)
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Golb Admin App',
            template: './src/admin-client-app/index.ejs'
        })
    ],

    devtool: NODE_ENV === "development" ? 'inline-source-map' : false

};