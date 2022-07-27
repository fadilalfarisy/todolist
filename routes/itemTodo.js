import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import auth from "../middleware/auth.js"
import item from "../controllers/itemController.js"

const router = express.Router()

//set up middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cookieParser())

//show item todo by id
router.get('/details', auth, item.getItemById)

//send form add item todo
router.post('/add/form', auth, (req, res) => {
    const idTodo = req.body.id
    res.render('addItem', {idTodo})
})

//add item todo
router.post('/add', auth, item.addItem)

router.post('/edit/form', auth, item.getItemById)

//edit item todo
router.post('/edit', auth, item.editItem)

//delete item todo
router.post('/delete', auth, item.deleteItem)

//edit status todo item
router.post('/editStatus', auth, item.editStatusItem)

export default router