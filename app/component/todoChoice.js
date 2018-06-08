import React from 'react';
import {Button} from 'antd';

export default class todoChoice extends React.Component{
    constructor(props){
        super(props)
        this.handleAll=this.handleAll.bind(this);
        this.handleActive=this.handleActive.bind(this);
        this.handleComplete=this.handleComplete.bind(this);
    }
    handleAll(){
        let all = this.refs.all.value;
        // this.props.SubmitChooseValue(all);
    }
    handleActive () {
        let active = this.refs.active.value;
        // this.props.SubmitChooseValue(active);
    }

    handleComplete () {
        let complete = this.refs.complete.value;
        console.log(complete)
        // this.props.SubmitChooseValue(complete);
    }
    render(){
        return(
            <div>
                <button className="btn btn-primary btn-choice" type="light" ref="all" value="1" onClick={this.handleAll}>全部</button>
                <button className="btn btn-primary btn-choice" type="light" ref="active" value="2" onClick={this.handleActive}>未完成</button>
                <button className="btn btn-primary btn-choice" type="light" ref="complete" value="3" onClick={this.handleComplete}>已完成</button>
            </div>
        )
    }
}