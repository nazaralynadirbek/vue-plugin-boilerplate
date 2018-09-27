const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './docs/docs.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                publicPath: 'static/'
            }
        }]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html',
            filename: './index.html',
            chunksSortMode: 'dependency'
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.entry = './src/app.js';

    module.exports.output = {
        publicPath: '/',
        libraryTarget: 'umd',
        filename: 'build.[chunkhash].min.js',
        path: path.resolve(__dirname, './dist')
    };

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
