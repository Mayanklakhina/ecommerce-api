const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const signUp = async(req, res)=>{

    const emailExist   = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).json({msg : "This Email Id already exists"});

    const salt  =  await bcrypt.genSalt(10);
    const hashedPassword  = await bcrypt.hash(req.body.password, salt);

  // create a user
    const newUser = new User({
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword
  })
  try {
     const userData   = await newUser.save();
     res.status(201).json(userData);
  }
  catch(err) {
      res.status(500).json(err);
  }
}

const login = async(req, res)=> {
    try {
    const user = await User.findOne({username : req.body.username });
    if(!user) return res.status(400).json('Wrong credentials');

    // password matching
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(500).json("wrong credentials");

    const accessToken = await jwt.sign({
        id : user._id,
        isAdmin : user.isAdmin
    }, process.env.JWT_SECRET_KEY, {expiresIn : "2d"})

    res.status(200).json({"msg" : "Logged In", token : accessToken});

    }catch(err) {
        res.status(500).json({msg : "internal server error"})
    }
}



module.exports = {signUp, login}