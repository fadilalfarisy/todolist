import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import multer from "multer"
import auth from "../middleware/auth.js"
import todo from "../controllers/todoController.js"

const router = express.Router()

//set up middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cookieParser())
router.use(express.static('public'))

//set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

//get all todos
router.get('/', auth, todo.getTodos)

//get todo by id
router.get('/:id', auth, todo.getTodoById)

//send form add todo
router.get('/add/form', auth, async (req, res) => {
  res.render('addTodo')
})

//add todo
router.post('/add', auth, upload.single('image'), todo.addTodo)

//send form edit todo
router.get('/edit/:id', auth, todo.getTodoById)

//edit todo
router.post('/edit/:id', auth, upload.single('image'), todo.editTodo)

//delete todo
router.get('/delete/:id', auth, todo.deleteTodo)

//edit status todo
router.post('/editStatus/:id', auth, todo.editStatusTodo)

//edit completed todo
router.put('/editCompleted/:id', auth, todo.editCompletedTodo)

//delete image
router.get('/image/:id', auth, todo.deleteImage)

export default router