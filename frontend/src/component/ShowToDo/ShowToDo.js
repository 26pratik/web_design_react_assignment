import React from 'react';
import './ShowToDo.scss';

export default class DisplayTodo extends React.Component{

    //Adding state values
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            id: null,
            title:null,
            description:null,
            duedate:null,
            duetime:null,
        }
    }

//changing status 
updateStatus(_id,title,dueDate,description,status){
    const duedate = dueDate.slice(0,10);
    const duetime = dueDate.slice(11,19);
    fetch(`http://localhost:5000/todolist/${_id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: title,
            description: description,
            dueDate : new Date(`${duedate}T${duetime}Z`) ,
            status : !status
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
      .then(res => {
          {status?alert("Task "+ `${title}`+" marked as Incomplete"):alert("Task "+ `${title}`+" marked as Complete")}
        
        this.props.updateState();
      })
      .catch(error => {
        if (error) throw error
      })
}    

    //calling delete api
    deleteTask = (title, id) => {
        
        fetch(`http://localhost:5000/todolist/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(res => {
            alert("Element Deleted with title : " + `${title}` );
            this.props.updateState();
          })
          .catch(err => {
            if (err) throw err
          })
    }


    render() {

        return (
            <div className="createTodo">
                {this.props.list&&this.props.list.map((element,id) => {
                    const { _id,title, description, createdDate, lastModifiedDate, dueDate, status } = element;  
                    
                    return (                        
                        <div key={_id} className="container1">
                            {    
                                <div className={status ?"todoOpen":"todoClose"}>
                                    <p className='paragraph'>{title}</p>
                                    <button className="dropDown" onClick={()=>this.setState({id:id,display:!this.state.display})}>\/
                                    </button>
                                <div className="buttonClass">
                                    
                                    <div>
                                        <button className="delete" onClick={()=>this.deleteTask(title, _id)}>D</button>
                                        <button className="complete" onClick={()=>this.updateStatus(_id,title,dueDate,description,status)}>C</button>
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.display && this.state.id===id?
                                            <div key={id} className="details">
                                                <p>Description: {description}</p>
                                                <p>Due Date: {dueDate.slice(0,10)} {dueDate.slice(11,19)}</p>
                                                <p>Creation Date: {createdDate.slice(0,10)} {createdDate.slice(11,19)}</p>
                                                <p>Updation Date: {lastModifiedDate.slice(0,10)} {lastModifiedDate.slice(11,19)}</p>
                                                <p>Status: {status?"Complete":"Incomplete"}</p>
                                            </div>
                                        :null
                                    }
                                </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}