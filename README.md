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

a、新建并编写模版文件index.html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>react-todolist</title>
 <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
 <link rel="stylesheet" type="text/css" href="/css/index.css">
</head>
<body>
<div class="container" style="padding:30px;">
 <div id="app"></div>
</div>
<script src="./bundle.js"></script>
</body>
</html>
b、在根文件夹新建app

App.js
这个组件我们可以认为是一个容器组件，我们会把addTodoItem.js、todoBox.js、todoChoice.js、todoItem.js、todoList.js放在这个组件中。

todoItem.js对应着每一条内容，包含checkbox、内容和删除按钮。
todoList.js包裹每一条item内容的父级。
addTodoItem.js添加Todo内容的组件。
todoBox.js整个app的主体部分，包含着其它小组件。
注意：

通过props传递子组件需要的值和方法
传递方法时一定要bind(this)，不然内部this会指向不正确
新建编写入口文件main.js
这边的data是我们的模拟数据，将其传入到`组件，在子组件中可以通过props.data的方法获取data`。

  var React=require('react');
  var ReactDOM=require('react-dom');
  import TodoBox from './app/component/todoBox';
  export  class Index extends React.Component{
   constructor(){
    super()
   }
   render(){
    return(
       <TodoBox/>
    )
   }
  }
  ReactDOM.render(,document.getElementById('app'))
TodoItem
该组件包含：一个确认是否完成的checkbox []、一条内容text、一个删除button
即：

<li>
工作
<button/>删除</button>
</li>
在react的写法如下：

  import React from 'react';
  import {Row, Col, Checkbox, Button} from 'antd';//之前引入的Ant Design组件库
  export default class TodoItem extends React.Component {
    constructor(props) {
      super(props)
      this.toggleComplete = this.toggleComplete.bind(this)
      this.deleteTask = this.deleteTask.bind(this)
    }
    toggleComplete() {
      this.props.toggleComplete(this.props.taskId)
    }
    deleteTask() {
      this.props.deleteTask(this.props.taskId)
    }
    render() {
      let task = this.props.task
      let itemChecked
      if (this.props.complete === "true") {
        task = {task}</del>
        itemChecked = true
      } else {
        itemChecked = false
      }
      return (
         <li className="list-group-item">
           <Row>
             <Col span={12}>
                 <Checkbox checked={itemChecked} onChange={this.toggleComplete}/> {task}
             </Col>
             <Col span={12}>
               <Button type="danger" className="pull-right" onClick={this.deleteTask}>删除                      </Button>
             </Col>
            </Row>
        </li>
      )
    }
  }
todoList
用一个<ul></ul>把item包起来

  import React from 'react';
  import TodoItem from './todoItem';
  export default class TodoList extends React.Component{
    constructor(props) {
      super(props);
    }
    render(){
      var taskList=this.props.data.map(listItem=>
      )
      return(
        <ul className="list-group">
          {taskList}
        </ul>
      )
    }
  }
AddTodoItem
该组件需要一个input和一个button

  import React from 'react';
  import ReactDOM from 'react-dom';
  import {Form, Input, Button,notification } from 'antd';
  export default class AddTodoItem extends React.Component {
    constructor(props) {
      super(props)
      this.saveNewItem = this.saveNewItem.bind(this)
    }
    saveNewItem(e) {
      e.preventDefault()
      let element = ReactDOM.findDOMNode(this.refs.newItem)
      let task = element.value
      if (!task) {
        notification.open({
          description: 'Todo内容不得为空！',
      });
      } else {
        this.props.saveNewItem(task)
        element.value = ""
      }
    }
    render() {
      return (
        <div className="add-todo-item">
           <Form.Item>
             <div className="new-add">
                <label htmlFor="newItem"></label>
                <Input id="newItem" ref="newItem" type="text" placeholder="吃饭睡觉打豆豆~">                    </Input>
                <Button type="primary" className="pull-right" onClick={this.saveNewItem}>保存                   </Button>
             </div>
</Form.Item>
        </div>
      )
    }
  }
TodoBox
用一个box将所有放进去

  import React from 'react';
  import TodoList from './todoList';
  import AddTodoItem from './addTodoItem';
  import TodoChoice from './todoChoice';
  import {DatePicker,Row,Col} from 'antd';
  const Datepicker = DatePicker;
  export default class TodoBox extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [
          {
            "id": "1",
            "task": "看书",
            "complete": "false"
          }, {
            "id": "2",
            "task": "学琴",
            "complete": "false"
          }, {
            "id": "3",
            "task": "听广播",
            "complete": "true"
          }
        ]
      }
      this.handleToggleComplete = this.handleToggleComplete.bind(this);
      this.handleTaskDelete = this.handleTaskDelete.bind(this);
      this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    }
    generateGUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
    handleToggleComplete(taskId) {
      let data = this.state.data;
      for (let item of data) {
        if (item.id === taskId) {
          item.complete = item.complete === "true" ? "false" : "true"
        }
      }
      this.setState({data})
    }
    handleTaskDelete(taskId) {
      let data = this.state.data
      data = data.filter(task => task.id !== taskId)
      this.setState({data})
    }
    handleAddTodoItem(task){
      let newItem={
        id:this.generateGUID(),
        task,
        complete:"false"
      }
      let data=this.state.data
      data=data.concat([newItem])
      this.setState({data})
    }
    render() {
      return (
       <div>
       <div className="well">
          <h1 className="text-center title-text">计划表</h1>
         <Row>
            <Col span={4}>
              <Datepicker />
            </Col>
           <Col span={8}>
             <AddTodoItem saveNewItem={this.handleAddTodoItem}/>
           </Col>
           <Col span={8} className='pull-right'>
             <TodoChoice/>
           </Col>
       </Row>
      <TodoList data={this.state.data} toggleComplete={this.handleToggleComplete} deleteTask={this.handleTaskDelete}/>
   </div>
</div>
      )
    }
  }
通过npm run server启动项目，打开本地http://localhost:8080 即可看到项目。

在我刚开始创建项目时，遇到了项目启动不了，

第一次报错：

我各种百度查询，查询无果，还重头创建项目，最后发现我package.json写的明明是”server”，所以被自己不细心坑了。

第二次报错：Cannot find module ‘webpack-cli/bin/config-yargs’

不能找到这个模块，那我就npm install webpack-cli安装，但依旧报错，查了很多最后发现是webpack和webpack-dev-server的版本不匹配问题，只需指定版本安装就好，因为我电脑webpack版本是2.7.0，所以指定npm install webpack-dev-server@2.11.2 -g。

第三次报错（可以启动，但是页面没有调用Ant Design样式）：
找了下解决方案，找到了两种解决方案：

方法一：在.babelrc中加入
{

"presets": ["es2015", "react"],
"plugins":[["import", {"libraryName": "antd", "style": "css"}]]
}

方法二：在webpack.config.js中加入红色标识部分
```
query:{
  presets: ['react', 'es2015'],
  plugins: [
       ['import', {
            libraryName: 'antd',
            style: 'css'
        }]
      ]
 }
最终npm run server启动项目如下:
