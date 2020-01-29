const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config
}

const getFilenamePattern = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const getCssLoaders = (extraLoader) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
            },
        },
        'css-loader',
    ]

    if (extraLoader) {
        loaders.push(extraLoader)
    }

    return loaders
}

const getBabelLoader = (presets) => {
    const loader = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties',
            ],
        },
    }

    if (presets) {
        loader.options.presets.push(...presets)
    }

    return loader
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.js',
    },
    output: {
        filename: getFilenamePattern('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.jsx', '.tsx'],
        alias: {
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src', 'favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            },
        ]),
        new MiniCssExtractPlugin({
            filename: getFilenamePattern('css'),
        }),
    ],
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: getBabelLoader(),
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: getBabelLoader(['@babel/preset-react']),
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: getBabelLoader(['@babel/preset-typescript']),
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: getBabelLoader([
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                ]),
            },
            {
                test: /\.css$/,
                use: getCssLoaders(),
            },
            {
                test: /\.less$/,
                use: getCssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: getCssLoaders('sass-loader'),
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