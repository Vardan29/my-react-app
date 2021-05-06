const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()

// /api/auth/register

router.post(
    '/register',
     [  
        check('name','Name can contain only Latin letters and must have at least one upper case letter').escape().trim().isLength({min:3,max:16}),
        check('surname','Surname can contain only Latin letters and must have at least one upper case letter').escape().trim().isLength({min:3,max:16}),
        check('birth','Incorrect birth Date').escape().trim().isISO8601().toDate(),
        check('gender','Check your gender').escape().trim().notEmpty(),
        check('phone','Incorrect phone number').escape().trim().isMobilePhone(),
        check('email','Non valid email').escape().trim().isEmail(),
        check('password','minimum password length is 6 characters').escape().trim().isLength({min:6})
    ],
    async(req,res)=>{
    try{
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Non valid register Datas'
            })
        }

        
        
        const {email,password,phone,gender,birth,name,surname}= req.body
        
        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({message:'User allready exists...'})
        }
        
        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({name,surname,gender,birth,phone,email, password:hashedPassword})

        await user.save()
        res.status(201).json({message:'User has been created...'})

    }catch(err){
        res.status(500).json({message: "Something went wrong, try again..."})
    }
})

// /api/auth/login

router.post('/login',
    [
        check('email1','Enter correct email').isEmail(),
        check('password1','Enter correct password').exists()
    ],
    async(req,res)=>{

        try{
            const errors = validationResult(req)
            
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'Non valid login datas'
                })
            }

            const {email1,password1} = req.body
            const email = email1
            const password = password1
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message:" Incorrect "})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:" Incorrect "})
            }
            const token = jwt.sign(
                { userId:user.id},
                config.get('jwtSecret'),
                {expiresIn:'1h'}
                )

                res.json({token, userId:user.id})

        }catch(err){
            res.status(500).json({message: "Something went wrong, try again..."})
        }
}
)

module.exports = router