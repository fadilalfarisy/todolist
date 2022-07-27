import bcrypt from "bcrypt"
import TodoList from "../models/todoList.js"

export default {
    login: async (req, res) => {
        const { username, password } = req.body;

        try {

            //find the user
            const existingUser = await TodoList.findOne({ username })
            if (!existingUser) {
                return res.json({
                    success : false,
                    info : "Username is invalid"
                })
            }

            //check password
            const hashPassword = await bcrypt.compare(password, existingUser.password)
            if (!hashPassword) {
                return res.json({
                    success : false,
                    info : "password is invalid"
                })
            }

            //set up cookie
            res.cookie('id', existingUser._id, {
                expires: new Date(Date.now() + 1000000),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })

            res.redirect('/todo')

        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success : false,
                info : "Login failed."
            })
        }
    },

    register : async(req, res) => {
        const { username, password } = req.body

        try {

            //check duplicate username
            const existingUser = await TodoList.findOne({ username })
            if (existingUser) {
                return res.json({
                    success : false,
                    info : "Your username was used."
                })
            }
            
            //hashing password
            const hashPassword = await bcrypt.hash(password, 10)
            
            const newUser = new TodoList({
                username,
                password : hashPassword,
            })

            //save data user
            const data = await newUser.save()

            //set up cookie
            res.cookie('id', data._id, {
                expires: new Date(Date.now() + 1000000),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })

            res.redirect('/todo')

        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success : false,
                info : "Sign Up failed."
            })
        }
    },

    logout : (req, res) => {

        try {
            
            res.clearCookie('id', { path: '/' })
            
            res.redirect('/')

        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success : false,
                info : "Logout failed."
            })
        }
    }

}