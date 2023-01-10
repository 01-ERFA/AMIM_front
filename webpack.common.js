const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|webp)$/, use: {
                  loader: 'file-loader',
                  options: { name: '[name].[ext]' }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
             },
             {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: ['file-loader']
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },


    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./src/img/icon.ico",
            template: 'template.html'
        }),
        new Dotenv({safe: true, systemvars: true})
    ]

}