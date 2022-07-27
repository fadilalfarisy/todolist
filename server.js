import express from "express"
import cors from "cors"
import connection from "./config/db.js"
import users from "./routes/user.js"
import todos from "./routes/todo.js"
import itemsTodo from "./routes/itemTodo.js"
import auth from "./middleware/auth.js"

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_ORIGIN
}))

// Set EJS as templating engine 
app.set("view engine", "ejs");

//connect to db
connection()

app.get('/', auth, (req, res) => {
    res.redirect('/todo')
})

app.use('/user', users)
app.use('/todo', todos)
app.use('/todo/item', itemsTodo)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})