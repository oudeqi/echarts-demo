const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    devtool: '#source-map',
    entry: {
        'main': './app/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './',
        pathinfo: true
    },
 //    resolve: {
	//     alias: {
	//     	createjs: 'createjs/builds/1.0.0/createjs.js'
	//     }
	// },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // {
            //     test: require.resolve('createjs/builds/1.0.0/createjs.js'),
            //     loader: "imports-loader?this=>window"
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '../',
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: 'postcss.config.js',
                                ctx: {
                                    autoprefixer: {browsers: ['> 1%']}
                                }
                            }
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'img/[name].[ext]',
                        limit: 1
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../',
                    limit: 1,
                }
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.html',
            chunks: ['main']
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('./dll_modules/dll-manifest.json')
        // }),
        // new AddAssetHtmlPlugin([{
        //     filepath: path.join(__dirname, 'dll_modules', 'dll.js'),
        //     hash: true,
        //     outputPath: 'vendor',
        //     publicPath: './vendor/',
        //     includeSourcemap: false
        //     // 默认为true。 当设置为true时，add-asset-html-plugin 会查找js的sourceMap文件
        // }])
    ],
    devServer: {
        host: "localhost",
        contentBase: [path.join(__dirname, 'app')],
        headers: {
            "X-Custom-Foo": "bar"
        },
        historyApiFallback: true,
        compress: true,//对资源启用 gzip 压缩
        publicPath: '/',
        inline: true,
        port: 3000,
        clientLogLevel: "none",//none, error, warning 或者 info（默认值）
        noInfo: false,
        open: true,
        // openPage: '/different/page'
    },
}


