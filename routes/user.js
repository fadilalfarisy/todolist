import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import user from "../controllers/userController.js"

const router = express.Router()

//set up middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cookieParser())

//send form register
router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

//send form create todo
router.get('/create', (req, res) => {
    res.render('addTodo')
})

//register
router.post('/register', user.register)

//login
router.post('/login', user.login)

//logout
router.get('/logout', user.logout)

export default router