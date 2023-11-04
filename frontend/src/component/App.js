import React from 'react';
import './App.scss';
import NewTodo from './CreateToDo/CreateToDo';
import DisplayTodo from './ShowToDo/ShowToDo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      view: false
    }
  }
  //lifecycle method for get request
  componentDidMount() {
    fetch('http://localhost:5000/todolist')
    .then(response => response.json())
    .then(data => this.setState({ data }));
  }
  updateState = () => {
    fetch('http://localhost:5000/todolist')
    .then(response => response.json())
    .then(data => this.setState({ data }));
  }
  postData = () => {
    alert("New Element Added");
    this.setState({ edit: false })
  }
  //using components for different funtionalities
  render() {
    return (
      <div className="App">
        <div>
          <div className="container">
            <h1 className="heading">
              TO DO APP
            </h1>
            {/* <br/> */}
            <button className="add-btn" onClick={() => this.setState({ view: !this.state.view })}>
              {
                this.state.view?<i className="fas fa-times"></i>:<i className="fas fa-plus"></i>
              }
              +
            </button>
            {this.state.view ?
                <NewTodo updateState={this.updateState}></NewTodo>
              : null
            }
          </div>

        </div>
        <div>
          <DisplayTodo list={this.state.data} updateState={this.updateState} />
        </div>
      </div>
    );
  }
}

export default App;
