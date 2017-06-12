const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const config = require('./config-loader').load();
const {NODE_ENV} = process.env;
const cwd = process.cwd();
const publicClientAppSrcDir = path.resolve(__dirname, "./src/public-client-app");

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
        path: path.resolve(cwd, config.publicDocRoot),
        publicPath: config.publicRoot,
        filename: 'index.bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    //use: 'css-loader?importLoaders=1!postcss-loader'
                    //use: 'css-loader'
                    use: [
                        //{
                        //    loader: 'style-loader',
                        //},
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }),
            },
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