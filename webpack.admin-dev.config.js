const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {NODE_ENV} = process.env;
const cwd = process.cwd();
const config = require('./config-loader').load();
const adminClientAppSrcDir = path.resolve(__dirname, "./src/public-client-app");

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
        path: path.resolve(cwd, config.adminDocRoot),
        publicPath: config.adminRoot,
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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1!postcss-loader'
                }),
            },
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
                    ADMIN_ROOT: JSON.stringify(config.adminRoot),
                    ADMIN_API_HOSTNAME: JSON.stringify(config.adminApiHostname),
                    ADMIN_API_PORT: JSON.stringify(config.adminApiPort),
                    ADMIN_API_BASENAME: JSON.stringify(config.adminApiBasename)
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Golb Admin App',
            template: path.resolve(adminClientAppSrcDir, 'index.ejs')
        }),
        new ExtractTextPlugin('[name].bundle.css')
    ],

    devtool: NODE_ENV === "development" ? 'inline-source-map' : false

};