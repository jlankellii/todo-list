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
                <Input id="newItem" ref="newItem" type="text" placeholder="吃饭睡觉打豆豆~"></Input>
                <Button type="primary" className="pull-right" onClick={this.saveNewItem} >保存</Button>
            </div>
        </Form.Item>
      </div>
    )
  }
}
