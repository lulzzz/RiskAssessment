
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);
    const clientBundleConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]',
            path: path.join(__dirname, 'wwwroot', 'dist')
        },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,

                    use: extractCSS.extract({ use: ['raw-loader', 'sass-loader'] })
                },
            ]
        },
        entry: {

            vendor: [
                '@angular/animations',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                '@angular/cdk',
                'angular2-jwt',
                '@swimlane/ngx-datatable',
                'hammerjs',
                'ng2-file-upload',
                '@angular/material',
                'roboto-fontface/css/roboto/roboto-fontface.css',
                '@covalent/core/common/platform.css',
                './ClientApp/theme.scss',
                '@swimlane/ngx-datatable/release/index.css',
                '@swimlane/ngx-datatable/release/themes/material.css',
                '@swimlane/ngx-datatable/release/assets/icons.css',
                '@covalent/core',
                '@covalent/http',
                '@covalent/highlight',
                '@covalent/markdown',
                '@covalent/dynamic-forms',
                'es6-shim',
                'es6-promise',
                'event-source-polyfill',
                'jquery',
                'zone.js',
                './node_modules/quill/dist/quill.snow.css'

            ]
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/14898
            new webpack.IgnorePlugin(/^vertx$/), // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    };

    return [clientBundleConfig];
}
