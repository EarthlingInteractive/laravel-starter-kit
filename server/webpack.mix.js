const mix = require('laravel-mix');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({

    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                { loader: 'cache-loader' },
                {
                    loader: 'thread-loader',
                    options: {
                        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                        workers: require('os').cpus().length - 1,
                    },
                },
                {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                    }
                }
            ]
        }]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
});

mix.ts('resources/js/app.ts', 'public/js')
    .extract(['bootstrap', 'jquery', 'axios'])
   .sass('resources/sass/app.scss', 'public/css');
