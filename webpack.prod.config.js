var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin'); //见下方解释@1
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //见下方解释@2

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app'); //见下方解释@3
var BUILD_PATH = path.resolve(ROOT_PATH, 'build'); //见下方解释@4

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'app.jsx'), //见下方解释@3
    vendor: ['react', 'react-dom', 'prop-types', 'marked', 'leancloud-storage'] //此处可以详解到底加入哪些第三方依赖？
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].bundle.js' //见下方解释@4
  },
  resolve: { //指明webpack在该路径下去寻找依赖模块，Webpack 会自动带上后缀后去尝试访问文件是否存在
    modules: [APP_PATH, "node_modules"],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //对APP_PATH路径下所有以.jsx/.js结尾的文件使用loaders转换代码
        loaders: ['babel-loader'],
        include: APP_PATH
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader", //见解释@5
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ //见解释@6
      name: "vendor"
    }),
    new ExtractTextPlugin("styles.css"), //见下方解释@2
    new HtmlwebpackPlugin({
      title: 'LearnAtHome'
    })
  ]
}

//解释@1：（插件html-webpack-plugin的作用）
//自动生成项目的HTML文件


//解释@2：(插件extract-text-webpack-plugin的作用)
//默认情况下webpack在通过js引入css时，样式内容和js内容是一起加载的，
//样式内容的插入和解析甚至会被延后到js内容的执行期。可能会导致一个短暂的无样式瞬间。
//这与传统的前端页面性能优化方式(样式文件在<head>中就被加载，js延后至文档加载解析完才执行)相违背。
//借助插件ExtractTextPlugin,webpack可以在打包时将样式内容抽取出来并放在额外的css文件中，即此处的styles.css。
//在页面引入该styles.css文件即可。

//解释@3： （webpack入口设置）
//entery.app指明了webpack的入口文件;包含业务逻辑代码。
//entry.vendor指明了第三方依赖。
//配置上述两个文件的意义在于：vendor中的第三方依赖是很少更新的，可以设置长期缓存在客户端。当修改了业务代码，重新生成app.jsx。只需下载新的app.jsx。


//解释@4： (webpack出口设置)
//在当前根目录下，创建build文件夹，来放将要被构建生成的结果文件bundle.js。

//解释@5：
//css-loader:处理@import,url等css语句;
//style-loader：将css文件放入style标签并插入head;
//既然使用了extract-text-webpack-plugin。说明本不需要style-loader。
//保险起见：style-loader就可以放在fallback中，如果不能成功编译css文件并导入到规定的文件中，则使用style-loader


//解释@6： （CommonsChunkPlugin的作用）
//为了生成vendor.js和app.js两个文件，即将项目中第三方依赖代码抽离出来。可使用CommonsChunkPlugin插件
//生成以.vendor.js结尾的文件（详见文末的图片：build的结果）
