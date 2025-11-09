const userModel=require('../modal/user.model');

// gets data from the user through the http responses 
const {validationResult}=require('express-validator')
const BlacklistTokenModel=require('../modal/blacklistToken.model')
const userService=require('../services/user.service')
module.exports.registerUser=async (req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
       
// if errors exists it return 400 bad request if errors doesnot exist then yeah its fine
        return res.status(400).json({errors:errors.array()});
    }

    
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


// Login route 
module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Explicitly select password field and other needed fields
        const user = await userModel.findOne({ email })
            .select('+password fullname email');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax'
        });
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(200).json({ 
            success: true,
            token, 
            user: userResponse 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
}


module.exports.getuserProfile=async (req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser=async (req,res,next)=>{

    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistTokenModel.create({token});
    res.status(200).json({message:'Logged out successfully'});
}