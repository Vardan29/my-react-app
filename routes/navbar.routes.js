const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()
// /api

router.get('/',auth,
    async(req,res)=>{
        try{
            const user = await User.findOne({_id:req.user.userId})
            
            res.send([user.name,user.surname])

        }catch(err){
            res.status(500).json({message: "Something went wrong, try again..."})
        }
}
)

module.exports = router