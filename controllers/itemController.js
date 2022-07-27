import TodoList from "../models/todoList.js"

export default {
    getItemById : async(req, res) => {
        const {idTodo, idItemTodo} = req.body
        const {id} = req.cookies
    
        try{
            const data = await TodoList.findById(id);
    
            //select todo by id
            const todo = data.todos.find( todo => {
                return todo._id == idTodo
            })
    
            //select todo item by id
            const item = todo.items.find( item => {
                return item._id == idItemTodo
            })
    
            res.render('editItem', {
                idTodo,
                item
            });
            
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    addItem: async (req, res, next) => {
        const {idTodo, itemTodo, tag} = req.body;
        const {id} = req.cookies
    
        const arrayTag = tag.split('#')
        arrayTag.shift();
        const formatArrayTag = arrayTag.map(element => {
            return `#${element.trim()}` 
        })
    
        try {
            await TodoList.updateOne({_id : id}, {  
                $push: {
                        'todos.$[todo].items' : {
                            item : itemTodo,
                            tag : formatArrayTag
                        }
                }
            }, {
                arrayFilters : [
                    {'todo._id': idTodo}
                ]
            })
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('Error!')
        }
    },

    editItem : async (req, res, next) => {
        const {idTodo, idItemTodo, itemTodo, tag} = req.body;
        const {id} = req.cookies
    
        const arrayTag = tag.split('#')
        arrayTag.shift();
        const formatArrayTag = arrayTag.map(element => {
            return `#${element.trim()}` 
        })
    
        try {
            await TodoList.updateOne({_id : id}, {  
                $set: {
                        'todos.$[todo].items.$[item].item' : itemTodo,
                        'todos.$[todo].items.$[item].tag' : formatArrayTag
                }
            }, {
                arrayFilters : [
                        {'todo._id': idTodo},
                        {'item._id': idItemTodo}
                    ]
            })
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    deleteItem : async(req, res, next) => {
        const {idTodo, idItemTodo} = req.body;
        const {id} = req.cookies
    
        try{
            await TodoList.updateOne({_id : id}, {
                $pull: {
                    'todos.$[todo].items': { "_id": idItemTodo}
                },
            }, {
                arrayFilters : [{
                    'todo._id': idTodo
                }]
            })
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    },

    editStatusItem : async (req, res, next) => {
        const {idTodo, idItemTodo, status} = req.body
        const {id} = req.cookies
    
        try {
            await TodoList.updateOne({_id : id}, {  
                $set: {
                        'todos.$[todo].items.$[item].statusItem' : status
                }
            }, {
                arrayFilters : [
                        {'todo._id': idTodo},
                        {'item._id': idItemTodo}
                    ]
            })
    
            res.redirect('/todo')
    
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Error!")
        }
    }
}