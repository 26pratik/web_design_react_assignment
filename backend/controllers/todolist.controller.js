const todolistService= require('../services/todolist.services');

const get = (req,res) => {
    const promise = todolistService.getAll();
    promise.then((val)=>{
        res.status(200);
        res.json(val);
    }).catch((e)=>{
        res.status(400);
        res.json(e.message)
    })
}

const add = (req,res) => {
    const todolistItem = {...req.body};
    const promise = todolistService.addNewTodoList(todolistItem);
    promise.then((val)=>{
        res.status(200);
        res.json(val);
    }).catch((e)=>{
        res.status(400);
        res.json(e.message)
    })
}

const update = (req,res) => {
    const id = req.params.id;
    const todolistItem = {...req.body};
    console.log(todolistItem)
    const promise = todolistService.updateTodoList(id,todolistItem);
    promise.then((val)=>{
        res.status(200);
        res.json(val);
    }).catch((e)=>{
        res.status(400);
        res.json(e.message)
    })
}

const remove = (req,res) => {
    const id = req.params.id;
    const promise = todolistService.deleteTodoList(id);
    promise.then((val)=>{
        res.status(200);
        res.json(val);
    }).catch((e)=>{
        res.status(400);
        res.json(e.message)
    })
}

module.exports = {
    get:get, 
    add:add,
    update:update,
    remove:remove
}