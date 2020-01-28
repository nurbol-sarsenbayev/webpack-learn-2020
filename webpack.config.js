const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src', 'favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            },
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        port: 4200,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.csv$/,
                use: ['csv-loader'],
            },
        ]
    }
}