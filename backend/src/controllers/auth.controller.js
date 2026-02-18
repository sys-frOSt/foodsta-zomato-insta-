const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//api to register user
async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const UserAlreadyExists = await userModel.findOne({ email });

    if(UserAlreadyExists) {
        return res.status(400).json({
             message: 'User already exists' 
            });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
        fullName,
        email,
        password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
    
} 
//api to login user
async function loginUser(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({message:'Invalid email or password'});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid email or password'});
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie('token', token)

    res.status(200).json({
        message:'Login successful',
        user:{
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}
//api to logout user
function logoutUser(req,res){
    res.clearCookie('token');
    res.status(200).json({message:'Logout successful'});
}

//api for foodpartner registration
async function registerFoodPartner(req, res) {
    const{name,email,password,contactName,contactNumber,address}=req.body;

    const isFoodPartnerExists = await foodPartnerModel.findOne({email});

    if(isFoodPartnerExists){
        return res.status(400).json({message:'Food partner already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const foodPartner = new foodPartnerModel({
        name,
        email,
        password:hashedPassword,
        contactName,
        contactNumber,
        address
    });

    await foodPartner.save();

    const token = jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie('token', token)
    res.status(201).json({
        message:'Food partner registered successfully',
        foodPartner:{
            id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email,
            contactName: foodPartner.contactName,
            contactNumber: foodPartner.contactNumber,
            address: foodPartner.address
        }
    })
}
//login api for food partner
async function loginFoodPartner(req,res){
    const{email,password}=req.body; 
    const foodPartner = await foodPartnerModel.findOne({email});
    if(!foodPartner){
        return res.status(400).json({message:'Invalid email or password'});
    }   
    const isPasswordValid = await bcrypt.compare(password,foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid email or password'});
    }
    const token = jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie('token', token)
    res.status(200).json({
        message:'Login successful',
        foodPartner:{
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    })
}
//logout api for food partner
async function logoutFoodPartner(req,res){
    res.clearCookie('token');
    res.status(200).json({message:'Logout successful'});
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}

