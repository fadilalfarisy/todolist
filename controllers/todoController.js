import TodoList from "../models/todoList.js"
import path from 'path'
import { fileURLToPath } from 'url'
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    getTodos : async(req, res) => {
        const {id} = req.cookies
    
        try{
            const data = await TodoList.findById(id)

            const formatOutput = []

            data.todos.forEach(todo => {
                let distinctTag = []
                todo.items.forEach(item => {
                    item.tag.map(elementTag => {
                        if(distinctTag.indexOf(elementTag) === -1){
                            distinctTag.push(elementTag)
                        }
                    })
                })
    
                formatOutput.push({
                    todos : todo, 
                    tag: distinctTag
                })
                
            })
    
            res.render('todos', {
                username : data.username,
                response : formatOutput
            });
            
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    getTodoById : async(req, res) => {
        const idTodo = req.params.id
        const {id} = req.cookies
    
        try{
            const data = await TodoList.findById(id)
    
            const getTodo = data.todos.find( todo => {
                return todo._id == idTodo
            })
    
            res.render('editTodo', {
                getTodo
            });
            
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    addTodo:  async(req, res) => {
        const {todo, description} = req.body
        const {id} = req.cookies
    
        let file = ''
        let type = ''
        let pathImage = ''
    
        if(req.file){
            file = req.file.path
            type = req.file.mimetype
            pathImage = fs.readFileSync(path.join(__dirname, '../', file));
        }
    
        try{
            await TodoList.updateOne({_id : id}, { 
                $push: { 
                    todos: {
                        todo : todo,
                        description : description,
                        image : {
                            data : pathImage,
                            contentType: type
                        }
                    } 
                }
            })

            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    editTodo : async(req, res, next) => {
        const {todo, description} = req.body
        const idTodo = req.params.id
        const {id} = req.cookies

        let file = ''
        let type = ''
        let pathImage = ''
    
        try{

            if(req.file){
                file = req.file.path
                type = req.file.mimetype
                pathImage = fs.readFileSync(path.join(__dirname, '../', file))

                await TodoList.updateOne({_id : id}, {
                    $set: { 
                        'todos.$[todo].todo' : todo,
                        'todos.$[todo].description' : description,
                        'todos.$[todo].image' : {
                            data : pathImage,
                            contentType: type
                        }
                    }
                },{
                    arrayFilters : [{
                        'todo._id' : idTodo
                    }]
                })
            } else {
                await TodoList.updateOne({_id : id}, {
                    $set: { 
                        'todos.$[todo].todo' : todo,
                        'todos.$[todo].description' : description
                    }
                },{
                    arrayFilters : [{
                        'todo._id' : idTodo
                    }]
                })
            }
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    deleteTodo : async(req, res, next) => {
        const idTodo = req.params.id
        const {id} = req.cookies
    
        try{
            await TodoList.updateOne({_id : id}, {
                $pull: {
                    'todos': { 
                        '_id': idTodo
                    }
                },
            })
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    editStatusTodo: async (req, res, next) => {
        const {status} = req.body
        const idTodo = req.params.id
        const {id} = req.cookies
    
        try {
            
            await TodoList.updateOne({_id : id}, {
                $set: { 
                    "todos.$[todo].status" : status
                }
            },{
                arrayFilters : [{
                    'todo._id' : idTodo
                }]
            })
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    editCompletedTodo : async (req, res, next) => {
        const {completed} = req.body
        const idTodo = req.params.id
        const {id} = req.cookies
    
        try {
            await TodoList.updateOne({_id : id}, {
                $set: { 
                    "todos.$[todo].completed" : completed
                }
            },{
                arrayFilters : [{
                    'todo._id' : idTodo
                }]
            })
    
            next()
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    deleteImage : async (req, res, next) => {
        const idTodo = req.params.id
        const {id} = req.cookies
    
        try {
            await TodoList.updateOne({_id : id}, {
                $set: { 
                    'todos.$[todo].image' : {
                        data : '',
                        contentType: ''
                    }
                }
            },{
                arrayFilters : [{
                    'todo._id' : idTodo
                }]
            })
    
            res.redirect(`/todo/edit/${idTodo}`)
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    }
}