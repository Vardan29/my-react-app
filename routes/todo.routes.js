const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Todo = require('../models/Todo')
const router = Router()

// /api/todo
router.post('/generate',auth, async(req,res)=>{
    try{
        const {text} = req.body
        
        const existing = await Todo.findOne({text})

        if(existing){
            return res.json({todo: existing})
        }
        const todo = new Todo({
            text, owner: req.user.userId
        })
        await todo.save()

        res.status(201).json(todo)
    }catch(err){
        res.status(500).json({message:'Somethings went wrong...'})
    }
})

router.get('/',auth, async(req,res)=>{
    try{
        const todos = await Todo.find({owner:req.user.userId})
        res.json(todos)
    }catch(err){
        res.status(500).json({message:'Somethings went wrong...'})
    }
})

router.delete('/:id',auth,async(req,res)=>{
    
    try{
        
        await Todo.findById(req.params.id, (err, todo) => {
    
            if (err) { res.status(500).json({message:'Somethings went wrong...'})}
    
            
             res.status(200).json({message:todo})
        }).remove()
    }catch(err){
        res.status(500).json({message:'Somethings went wrong...'})
    }
        
})
module.exports = router

