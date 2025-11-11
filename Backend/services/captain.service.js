const capatainModel=require('../models/captain.model');
const bcrypt=require('bcrypt');

module.exports.createCaptain=async({email,password,firstname,lastname,color,plate,capacity,vehicleType})=>{
    if(!email||!password||!firstname||!lastname||!vehicle){
        throw new Error('All fields are required');
    }
    const captain=capatainModel.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}