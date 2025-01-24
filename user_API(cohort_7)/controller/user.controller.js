const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs");

//Create a User function
const createUser = async(req, res) => {
  const {password, ...others} = req.body;
  //salt the password
  const salt = bcrypt.genSaltSync(10);
  //hash the password
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  //validating user credentials: using email
  const validateUser = await userModel.findOne({email: others.email});
  console.log(validateUser);
  if(validateUser) {
    return res.json({message: "User already exist"})
  }
  // create new user
  try{
    const newUser = new userModel({password: hashedPassword, ...others}); 
    await newUser.save();
    res.send("User created successfully");
  }
  catch (error) {
    res.send("Cannot create user");
  };
};

// Login user
const loginUser = async(req, res) => {
  const {email, password} = req.body;
  // check for email and password
  if(!email || !password) {
    return res.json({message: "cannot find details"});
  }
  //check for user existence
  const checkUser = await userModel.findOne({email})
  if(!checkUser) {
    return res.json({message:"User not found"})
  }
  //check if password is correct
  const checkPassword = bcrypt.compareSync(password, checkUser.password)
  if(!checkPassword){
    return res.json({message:"password does not exist"})
  }
  // return information to the frontend 
  return res.json(checkUser)
};

// delete user
const deleteUser = async(req, res) => {
  const {id} = req.body;
  try{
    const user = await userModel.findByIdAndDelete(id)
    res.send("user deleted successfully");
}
catch (error) {
     res.send("Something went wrong");
}
};


module.exports = {createUser, loginUser,  deleteUser};