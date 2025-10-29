const userModel=require('../modal/user.model');

// gets data from the user through the http responses 
const {validationResult}=require('express-validator')
const userService=require('../services/user.service')
module.exports.registerUser=async (req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
       
// if errors exists it return 400 bad request if errors doesnot exist then yeah its fine
        return res.status(400).json({errors:errors.array()});
    }

    console.log(req.body);
    // gets data
    const {fullname,email,password}=req.body;
    // gets the hashedpassword from the usermodel hashpassword method 
    const hashedPassword=await userModel.hashPassword(password);

    const user =await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });

    const token=user.generateAuthToken();
    res.status(200).json({token,user});

}