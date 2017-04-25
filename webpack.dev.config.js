const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const {NODE_ENV, GOLB_CONFIG} = process.env;
const configFilePath = path.resolve(__dirname, GOLB_CONFIG || "config.json");
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
const cwd = process.cwd();

module.exports =
{
    entry: {
        app: "./src/admin-client-app",
        vendor: ['react', 'react-dom']
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
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        }),
        new webpack.DefinePlugin({
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