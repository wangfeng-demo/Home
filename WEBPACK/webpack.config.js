const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPligin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Webpack = require('webpack')
let path = require('path')
/* 基于webpack起服务用loaclhost的方式打开文件
npm i webpack-dev-server -D(可以再输出目录下执行)
实现静态服务 */

module.exports={
    // devServer:{//开发服务器的配置
    //     port:3000,
    //     compress:true,
    //     contentBase:"./build",
    //     open:true
    // },
    optimization: { //优化项                          
      minimizer: [
        // new UglifyJsPlugin({ //压缩js
        //   cache: true,//缓存
        //   parallel: true,//并发打包多个
        //   sourceMap: true//源码映射
        // }), 
        new OptimizeCss()//压缩css
      ]
    },
    mode:"development",
    entry:"./src/index.js",
    output:{
        // filename:'boundle.[hash:8].js',//多生成一个不重复的打包文件
        filename:'boundle.js',
        path:path.resolve(__dirname,'build')
     },
     module: {
        rules: [
          // {
          //   test:require.resolve('jquery'),
          //   use:'expose-loader?$'          //暴露$给全局
          // },
          // { 
          //   test: /\.js$/,
          //   use:{                          //js代码校验
          //     loader:"eslint-loader",
          //     options:{
          //       enforce:'pre'//previous                         ,
          //     }
          //   }
          // },
          {
            test: /\.(png|jpg|gif)$/,
            use:[
              {
                loader:'file-loader',
              } 
            ]

          },
          {
            test: /\.css$/,
            // use: [ 'style-loader', 'css-loader' ]        //处理css样式 
            use: [
              MiniCssExtractPligin.loader , // MiniCssExtractPligin.loader创建link标签
              'css-loader' ,
              "postcss-loader",//在解析css之前兼容前缀,
            ]  
          },
          {
            test: /\.less$/,//处理css样式
            use: [
                // loader: "style-loader" ,
                MiniCssExtractPligin.loader,
                "css-loader" ,
                "postcss-loader",//在解析css之前兼容前缀
                "less-loader"
            ]
        },
        {
          test: /\.js$/,
          include:path.resolve(__dirname,'src'),
          exclude: /node_modules/,  
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],//es6转es5
              plugins:[
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
               "@babel/plugin-transform-runtime"
              ]
            }
          }
        },
      ]
    },
    plugins: [//html插件 
        new HtmlWebpackPlugin({
            template: './src/index.html',//模板    
            finename:"index.html",//压缩后的文件名
            minify:{//压缩html
                removeAttributeQuotes:true,//删除html里的双引号，
                collapseWhitespace:true//折叠一行
            },
            hash:true
        }),
        new MiniCssExtractPligin({
          filename:'main.css'//抽离出的css文件名
        }),
        new Webpack.ProvidePlugin({//在每个模块中注入$
              $:'jquery'
        })
      ]
}