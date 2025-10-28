const userModel=require('../modal/user.model');


const {validationResult}=require('express-validator')
const userService=require('../services/user.service')
module.exports.registerUser=async (req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
       
// if errors exists it return 400 bad request if errors doesnot exist then yeah its fine
        return res.status(400).json({errors:errors.array()});
    }

}