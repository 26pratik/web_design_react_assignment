import React from 'react';
import './CreateToDo.scss';

export default class CreateToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            description : "",
            duedate : null,
            duetime : null
        }
    }
    //on change event handler
    updateValue = (event) => {
        event.preventDefault(); 
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    // post api call to add new todo
    postTodo = () => {
        fetch("http://localhost:5000/todolist", {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                dueDate : new Date(`${this.state.duedate}T${this.state.duetime}:30Z`)                
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(res => {
            alert("New todo element added");
            this.props.updateState();
          })
          .catch(error => {
            if (error) throw error
          })
      }


    render(){
        //adding new todo to list
        return(
            <form>
                <fieldset className="fieldset">
                    <input type="text" name="title" className="textField" onChange={this.updateValue} required></input>
                </fieldset>
                <fieldset className="fieldset">
                    <input type="text" name="description" className="textField" onChange={this.updateValue} required></input>
                </fieldset>
                <fieldset className="fieldset">
                    <input type="date" name="duedate" className="textField" onChange={this.updateValue} required></input>
                </fieldset>
                <fieldset className="fieldset">
                    <input type="time" name="duetime" className="textField" onChange={this.updateValue} required></input>
                </fieldset>
                <button className="postTodo"onClick={this.postTodo}>Create</button>
            </form>
        )
    }
}
