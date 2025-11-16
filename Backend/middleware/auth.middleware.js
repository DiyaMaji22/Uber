const userModel=require('../modal/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const BlacklistTokenModel = require('../modal/blacklistToken.model');
const blacklistTokenModel = require('../modal/blacklistToken.model');
const captainModel = require('../modal/captain.model');
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
    const isBlacklisted = await BlacklistTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:'Token is invalid'});
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

module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

    // console.log(token);
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlacklisted=await blacklistTokenModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captainModel = require('../modal/captain.model');
        const captain=await captainModel.findById(decoded._id);
        
        if(!captain) {
            return res.status(401).json({message:'Captain not found'});
        }
        
        req.captain=captain;
        next();

    }catch(err)
    {
        return res.status(401).json({message:"Unauthorized"});
    }


}