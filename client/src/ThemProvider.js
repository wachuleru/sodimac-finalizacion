import React from 'react';
import GlobarContext from './context';

class ThemeProvider extends React.Component{
    constructor(){
        super();
        this.state={
            todos:[
                { task: 'tarea 1', user:'manu'},
                { task: 'tarea 2', user:'manu'},
                { task: 'tarea 3', user:'amilio'},
                { task: 'tarea 4', user:'amilio'},
                { task: 'tarea 5', user:'amilio'},
                { task: 'tarea 6', user:'amilio'},
                { task: 'tarea 7', user:'amilio'}
            ],
            addTask: (title)=>this.setState({todos: this.state.todos.concat(title)}),
            removeTask: (taskId)=>this.setState({todos: this.state.todos.filter( item => item!== this.state.todos[taskId])})
        }

       
    }
    render(){
        return(
            <GlobarContext.Provider value={this.state} >
                {this.props.children}
            </GlobarContext.Provider>
        )
    }
}

export default ThemeProvider;