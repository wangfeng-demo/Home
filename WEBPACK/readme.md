### 打包工具
>  grunt gulp webpack

### 怎么使用webpack
>  1 先搭建一个文件夹
>  2 在文件夹中安装 webpack 和 webpack-cli
>  3 建立一个src文件夹，所有的资源文件都放到该文件夹中
>  4 使用时  需要建立一个webpack.config.js
>		    该文件中存放的是webpack的配置信息 mode entry output module：{rules[loader]} pligins
>  5 在package.json中  script属性配置脚本，直接写 "build": "webpack --config webpack.config.js",生产
                                                "dev": "webpack-dev-server"，开发
> 			这是在运行  npm run build   这样就会按照配置信息打包对应的文件
>  6 还可以在package.json中指定走对应的配置文件  “webpack --config ./build/xxx.js” 这种就能指定路径 
> 	 还可以用起服务的形式运行代码，"webpack-dev-server --env.development --config ./build/webpack.base.js" 

七、 插件
   1、 html插件html-webpack-plugin -D(参数 压缩)

   2、 抽离css文件的插件 打包以link的方式引入 mini-css-extract-plugin -D
       将style-loader替换=>>> MiniCssExtractPligin.loader创建link标签

   3、 自动兼容前缀 postcss-loader(解析css样式)  autoprefixer -D 建立postcss.config.js文件 引autoprefixer      插件

   4、 将抽离出的css文件压缩 optimize-css-assets-webpack-plugin -D(性能优化)  压缩css
       配合  uglifyjs-webpack-plugin -D插件使用    压缩js 
 
八、在webpack处理js模块（高级语法转低级语法）babel-loader
     1、babel-loader  @babel/core转化器 @babel/preset-env (es6转es5)
     2、解析类语法
          @babel/plugin-proposal-class-properties -D  在babel配置中配置
          plugins:[
                '@babel/plugin-proposal-class-properties'//配置解析类的插件
              ]
     3、装饰器语法
        @babel/plugin-proposal-decorators -D 装饰器插件   配置插件
九、处理js语法以及校验
       生成语法包 优化 抽离公共部分(genarater)

       @babel/plugin-transform-runtime -D 配置
       配合 @babel/runtime --save

       'aaa'.includes(a)=>es7语法  实例方法不解析   用补丁模块 @babel-polyfill 下载之后再代码里引入            
       js代码校验（eslint）
       npm i eslint eslint-loader 在rules 里配置js 以及eslint-loader
十、全局变量引入问题
   例如   用jquery需要暴露给全局  => window.$
          下载expose-loader暴露全局的loader  内联loader 
           pre 前面执行的loader normal 普通的loader  后置 postloader
       方法1：直接引入=> import $ from 'expose-loader?$!jquery'       =>暴露到window

       方法2: 代码中正常引用=>在配置文件中配置jquery 并指定暴露出的内容      => 暴露到window
          {
            test:require.resolve('jquery'),
            use:'expose-loader?$'
          },
       方法3：引入webpack插件   在plugin中new Webpack.ProvidePlugi =>暴露想暴露的内容
十一、webpack打包图片
 1、在js中创建图片    
       file-loader 默认在内部生成一张图 到build目录下
       把生成图片的，名字返回回来
 2、在css中
 3、<img src = ""alt = "">
       
