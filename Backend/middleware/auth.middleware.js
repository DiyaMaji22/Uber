const userModel=require('../modal/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports.authUser=async(req,res,next)=>{

    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    } else {
        token = req.cookies.token;
    }

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        
        if(!user) {
            return res.status(401).json({message:'User not found'});
        }
        
        req.user=user;
        next();

    }catch(err){
        return res.status(401).json({message:'Unauthorized'});

    }

}

