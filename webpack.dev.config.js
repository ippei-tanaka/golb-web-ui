const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configFilePath = path.resolve(__dirname, process.env.GOLB_CONFIG || "config.json");
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
const cwd = process.cwd();

module.exports =
{
    entry: './src/admin-client-app',

    output:
    {
        path: path.resolve(cwd, config.adminDocRoot),
        filename: 'index_bundle.js'
    },

    module:
    {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        title: 'Golb Admin App',
        template: './src/admin-client-app/index.ejs'
    })]
};