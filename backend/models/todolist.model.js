const mongoose = require('mongoose');

const TodolistSchema = new mongoose.Schema({
    title:{
        type:String,
        required: "Please enter a Title"
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date 
    },
    createdDate:{
        type:Date,
        default: Date.now
    },
    lastModifiedDate:{
        type:Date,
        default: Date.now
    },
    status:{
        type:Boolean,
        default:false
    }
})

TodolistSchema.virtual('id').get(()=>this._id.toHexString());
const model = mongoose.model('todolist',TodolistSchema);

module.exports = model;