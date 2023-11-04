const TodolistSchema = require('../models/todolist.model');

const getAll = () => {
    const promise = TodolistSchema.find().exec();
    return promise;
}

const addNewTodoList = (newtodolist) => {
    const todolist = new TodolistSchema(newtodolist);
    const promise = todolist.save();
    return promise;
}

const updateTodoList = (id,todoList) => {
    const promise = TodolistSchema.findOneAndUpdate({_id:id},{
        title:todoList.title,
        description:todoList.description,
        dueDate:todoList.dueDate,
        status:todoList.status,
        lastModifiedDate:new Date()
    }).exec();
    return promise;
}
const deleteTodoList = (id) => {
    const promise = TodolistSchema.findOneAndDelete({_id:id}).exec();
    return promise;
}
module.exports = {
    getAll : getAll,
    addNewTodoList : addNewTodoList,
    updateTodoList : updateTodoList,
    deleteTodoList : deleteTodoList
}

