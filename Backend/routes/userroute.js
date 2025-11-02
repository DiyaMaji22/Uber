const express=require('express');
const router=express.Router();
const {body}=require("express-validator")
const userController=require('../controller/user.controller')

const authMiddleware=require('../middleware/auth.middleware')

// register route
router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("FirstName must be atleast 3 chararacters long"),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],
userController.registerUser
)


// Login route
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password is wrong')
],
userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getuserProfile)



module.exports=router;