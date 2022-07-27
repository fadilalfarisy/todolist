import TodoList from "../models/todoList.js"

//check auth
async function auth(req, res, next){

    if(!req.cookies){
        return res.redirect('/user/login')
    }
    
    const {id} = req.cookies
    
    try{
        const user = await TodoList.findById(id)
        if (!user){
            return res.redirect('/user/login')
        }

        next()

    } catch(err) {
        console.log(err.message);
        return res.status(500).send({message : 'Error!'})
    }
}

export default auth