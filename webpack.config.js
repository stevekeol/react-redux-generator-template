var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'app.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map', //解释@1
  devServer: { //解释@2
    historyApiFallback: false,
    hot: true,
    progress: true
  },
  resolve: {
    modules: [APP_PATH, "node_modules"],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        loaders: ['eslint-loader'], //解释@3
        include: APP_PATH
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'], //解释@4
        include: APP_PATH
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }   
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'React-demo'
    }),
    new webpack.HotModuleReplacementPlugin(), //解释@5
  ]
}

//解释@1：（devtool: 'eval-source-map'的作用）
//'devtool'指明是否/如何生成源映射（指明webpack将以什么形式对源码module构建打包）
//开发和生产环境中可使用不同的方式。'eval-source-map'用在开发中可大幅提高持续构建效率。


//解释@2：（devServer的作用）
//在开发模式下，devServer提供开发虚拟服务器以便开发调试，且提供实时刷新加载（其实就是webpack-dev-server的配置项）。
//
//devServer.hot: 启用模块热更新，当源码有变动并保存后，页面自动刷新。
//注意：此处仅仅是表示启用。 启用后，webpack会自动添加 真正发挥模块热更新作用的webpack.HotModuleReplacementPlugin插件
//
//devServer.historyApiFallback： true指明页面出错不弹出404页面

//解释@3：(eslint-loader在webpack中的使用)
//表示在用babel编译.jsx代码之前，先检查代码是否符合规则。
//eslint-loader会在在根目录下查找.eslintrc文件，查看具体规则。

//解释@4：（babel-loader的作用）
//babel-loader在执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置。

//解释@5：(webpack.HotModuleReplacementPlugin()的作用)
//HotModuleReplacementPlugin依赖webpack-dev-server,后者在打包文件改变时更新打包文件或刷新整个页面，前者只刷新修改的部分。
//new webpack.HotModuleReplacementPlugin（）表示直接启用该插件。