# todo-list
first learn react and create a simple project
（1）新建一个todolist文件夹

$ mkdir todolist //创建文件夹
$ cd todolist//进入项目
（2）建立package.json文件

npm init
（3）安装相应的依赖，我先解释一下这些依赖的作用

npm install babel-cli babel-core --save-dev//安装Babel，Babel 是一个 JavaScript 编译器，他可以将es6或者es7的语法转化为浏览器能识别的javascript。
npm install react react-dom --save-dev//安装我们的主角，`react`
npm install webpack webpack-dev-server --save-dev//安装webpack，打包工具；和webpack-dev-server，用于来给我们开启一个服务的。
npm install css-loader babel-loader style-loader --save-dev//安装`loader`打包，通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
（4）新建webpack.config.js并配置

    module.exports = {
          entry: './main.js', // 指定webpack打包的入口文件
          output: { filename: './bundle.js' // 输出之后的文件名 },
          module: {//定义了对模块的处理逻辑
                loaders: [//定义一系列的加载器，以及一些正则表达式
                   {
                       test: /\.jsx?$/,
                       exclude: /node_modules/,
                       loader: 'babel-loader' // babel的loader，jsx文件使用babel-loader处理 },
                   {
                       test: /\.css$/,
                       exclude: /node_modules/,
                       loader: 'style!css' // css和styleloader，对css后缀的文件进行处理
                   }
                 ]
              },
        devtool: 'cheap-source-map'
       }
要让我们的 babel 能在 react中生效，同时支持es6，我们需要安装下面的插件

npm install babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save-dev
安装完依赖后，新建.babelrc文件并引入这几个依赖

{
  "presets": ["es2015","react",'stage-0']
}
项目中使用了Ant Design样式库.import {Row, Col, Checkbox, Button} from ‘antd’是引入Ant Design。也可以不使用。
用npm install antd —save-dev

（5）对package.json进行修改

"scripts": {
   "start": "webpack --watch",
   "server": "webpack-dev-server --hot --inline --history-api-fallback"}
注意：package.json里的”name”的名称不能与项目名相同。
（6）组件编写
