const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must be 3 charcters long']
        },
        lastname:{
            type:String,
            required:true,
            minLength:[3,'Last name must be 3 charcters long']
        }

    } ,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,'Please provide a valid email address']
    },
    password:{
        type:String,
        required:true,
        minLength:[6,'Password must be at least 6 characters long'],
    },
    socketId:{
        type:String

    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'Color must be at least 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            enum:['car','motocycle','auto'],
            required:true
        }


    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
});
captainSchema.methods.generateAuthToken=function(){

    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword=async function(password){

    return await bcrypt.compare(password,this.password)

}
captainSchema.methods.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('Captain', captainSchema);
module.exports=captainModel;