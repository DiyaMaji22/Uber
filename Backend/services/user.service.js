const userModel=require('../modal/user.model');


module.exports.createUser =async ({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('ALl fields are required');
    }
    const user=userModel.create({

        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}