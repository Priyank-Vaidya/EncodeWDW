const userSchema = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').require();
const bcrypt = require('bcryptjs');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

const signUpuser = async(req, res)=>{
    const { username, password } = req.body;


    try{

        //Firstly Storing the credentials in database
        const user = await userSchema.findOne({username})

        if(user){
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);

            //Storing the New User
            const newUser = await userSchema.create({username, password})

            //Saving the new User
            const savedUser = await newUser.save();


        //Now Generating the token
        const token = jwt.sign(user._id, process.env.JWT_SECRET_KEY)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(201).json({ user:user._id });

    }
}
    catch(err){
        const error = handleErrors(err)
        res.status(400).send(error);
    }
    

}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
    const user = await User.findOne({username});

    if(user){
        const validPassword = await bcrypt.compare(password, user.password);


        if(!validPassword) return res.status(400).json({message: "Invalid password"});


      const token = jwt.sign(user._id, process.env.JWT_SECRET_KEY);
      res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.SESSION_TIMEOUT * 1000 });

      res.status(200).json({ user: user._id });
      console.log("User Successfully Logged in");
    } 
}
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports = {signUpuser, loginUser};