const webpack = require("webpack"); 
const path = require("path"); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //transfer style vis css not js
const HtmlWebpackPlugin = require('html-webpack-plugin') ; 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development', //development | production
    optimization: {
        minimize: false //for minify .js files
    },
    entry: {//we create new property for each entry point , key is name and value should point to entry point
        'index' : './src/index/index.js' ,     
        'about' : './src/about/about.js' ,     
        'app' :   './src/app/app.js' ,     
        'article' : './src/article/article.js' ,     
        'articles' : './src/articles/articles.js' ,     
        'faq' : './src/faq/faq.js' ,     
        'forgetPassword' : './src/forgetPassword/forgetPassword.js' ,     
        'guide' : './src/guide/guide.js' ,     
        'login' : './src/login/login.js' ,     
        'product' : './src/product/product.js' ,     
        'products' : './src/products/products.js' ,     
        'report' : './src/report/report.js' ,     
        'rules' : './src/rules/rules.js' ,     
        'signup' : './src/signup/signup.js' ,     
        'basket' : './src/basket/basket.js' ,     
        'changePassword' : './src/changePassword/changePassword.js' ,     
        'editProfile' : './src/editProfile/editProfile.js' ,     
        'orders' : './src/orders/orders.js' ,     
        '404' : './src/404/404.js' ,     
        'comment' : './src/comment/comment.js' ,     
        'contact' : './src/contact/contact.js' ,     
    },
    output: {//for each entry point we create one .js bundle(with the same name of entry point)
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        //publicPath: './assets/imgs/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader" ,
				exclude: /node_modules/,
            },
            { //for transfer .css via css files
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: process.env.NODE_ENV === 'development', //for enabling HMR(hot module reloading)
                        reloadAll: true,
                      },
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // { //for transfer .css via js files
            //     test: /\.css$/,
            //     use: ['style-loader','css-loader','postcss-loader']
            // },
            {//for transfer .scss via css files
                test:/\.scss$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: process.env.NODE_ENV === 'development',
                        reloadAll: true,
                      },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            // { //for transfer .scss via js files
            //     test: /\.scss$/,
            //     use: ['style-loader','css-loader','postcss-loader','sass-loader']
            // },
            {
                test : /\.html$/,
                exclude: /node_modules/,		
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: false , //for minify html or not
                        publicPath: './'
                    }
                }]
            },
            {
                test : /\.(png|jpg|jpeg)$/ ,
                exclude: /node_modules/,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/imgs/',
                            publicPath : 'assets/imgs/'
                        }
                        }
                ]
            },
            {
                test : /\.(gif)$/ ,
                exclude: /node_modules/,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/imgs/gifs',
                            publicPath : 'assets/imgs/gifs'
                        }
                        }
                ]
            },
            {
                test : /\.(ttf|otf|woff|woff2|eot)$/ ,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/fonts/',
                            publicPath : 'assets/fonts/'
                        }
                        }
                ]
            },
            {
                test : /\.svg$/ ,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/svgs/',
                            publicPath : 'assets/svgs/'
                        }
                        }
                ]
            },
            {
                test : /\.mp4$/ ,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/vids/',
                            publicPath : 'assets/vids/'
                        }
                        }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //for each .html file we have one bundle .css file that its name is same as its entry point
            filename: "[name].css", 
            chunkFilename: '[id].css',
            ignoreOrder: false 
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'index.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['index'],
            template: './src/index/index.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'about.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['about'],
            template: './src/about/about.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'app.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['app'],
            template: './src/app/app.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'article.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['article'],
            template: './src/article/article.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'articles.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['articles'],
            template: './src/articles/articles.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'faq.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['faq'],
            template: './src/faq/faq.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'forgetPassword.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['forgetPassword'],
            template: './src/forgetPassword/forgetPassword.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'guide.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['guide'],
            template: './src/guide/guide.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'login.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['login'],
            template: './src/login/login.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'product.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['product'],
            template: './src/product/product.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'products.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['products'],
            template: './src/products/products.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'report.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['report'],
            template: './src/report/report.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'rules.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['rules'],
            template: './src/rules/rules.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'signup.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['signup'],
            template: './src/signup/signup.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'basket.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['basket'],
            template: './src/basket/basket.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'changePassword.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['changePassword'],
            template: './src/changePassword/changePassword.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'editProfile.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['editProfile'],
            template: './src/editProfile/editProfile.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'orders.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['orders'],
            template: './src/orders/orders.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: '404.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['404'],
            template: './src/404/404.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'comment.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['comment'],
            template: './src/comment/comment.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'contact.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['contact'],
            template: './src/contact/contact.html' //should point to target html file that we want to add <script>,<link>
        }),
        new CleanWebpackPlugin() ,
        new CopyWebpackPlugin([
            { from: './src/assets/icons', to:'assets/icons' } , 
            { from: './src/manifest.json', to:'' } ,   
            { from: './src/sw.js', to:'' } 
        ])
    ]
};