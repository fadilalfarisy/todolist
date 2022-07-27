import mongoose from 'mongoose'

const {Schema} = mongoose;

//create schema todolist
const todoListSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{
        todo: {
                type: String,
                required: true,
        },
        status : {
            type: String,
            enum: ['uncheck', 'checked'],
            default: 'uncheck'
        },
        completed: {
            type: String,
            enum : ['on progress','blocked', 'done'],
            default: 'on progress'
        },
        description: {
            type: String
        },
        image : {
            data: Buffer,       
            contentType: String
        },
        items: [{
            item: {
                type: String
            },
            tag: [{
                type: String
            }],
            statusItem: {
                type: String,
                enum: ['uncheck', 'checked'],
                default: 'uncheck'
            }
        }]
    }]
})


//create model
const todoList = mongoose.model('todoList', todoListSchema);

export default todoList; 