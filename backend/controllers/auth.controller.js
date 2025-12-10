import userModel from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//registeruser
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}
//loginuser
async function loginUser(req, res) {
    const {email,password}= req.body
    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const isPasswodValid = await bcrypt.compare(password, user.password)

    if(!isPasswodValid){
      return res.status(400).json({
        message:"invalid email or password"
      })
    }

     const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

 res.status(201).json({
    message: "user loggedin successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}
//logoutuser
async function logoutUser(req,res) {
  res.clearCookie("token");
  res.status(200).json({
    message:"user logout successfully"
  })
}

export {registerUser, loginUser, logoutUser}