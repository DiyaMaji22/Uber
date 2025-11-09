//use to  define the schema or the data that we are taking from the user itself 

const mongoose=require('mongoose');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be atleast three characters'],
        },
        lastname:{
            type:String,
            
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must have a minlength of 5 characters']
    },
    password:{
        type:String,
        required:true,
        select:false,

    },
    socketId:{
        type:String
    }
})
// to create session token 
userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
// during the time of login we need to compare the password that has been passed in the database and the password that has been passed as reference 

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}
// Used for hashing the password with 10 rounds of salting (salting is 2^10 iterations of hashing)
userSchema.statics.hashPassword=async function(password) {
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel