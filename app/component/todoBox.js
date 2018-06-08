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
