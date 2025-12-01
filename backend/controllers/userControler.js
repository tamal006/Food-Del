import userauthmodel from "../models/user.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
//email sent part
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "tamalkumarkhan006@gmail.com",
    pass: "jjvs qocx ceun hykj",
  },
});
///////////////////////////////////////////////////////////////////////////////////
//create token
const createToken = (id) => {
  //generate a token
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//////////////////////////////////////////////////////////////////////////////////
//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if the email is present in the db
    const user = await userauthmodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user doesnot exist" });
    }
    //check the password is correct or not
    const ismatch = await bycrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    //create token for user
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
////////////////////////////////////////////////////////////////////////////////////////
//resister user
const resisterUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //check if the user already exist
    const exist = await userauthmodel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "user already exist" });
    }

    //validating emailformat
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }

    //strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }

    //hashing user password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    //hashing the otp
    const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
    const expireTime = Date.now() + 5 * 60 * 1000;
    const hashedotp = await bycrypt.hash(otp, salt);
    //use new model to save in db
    const newUser = new userauthmodel({
      name: name,
      email: email,
      password: hashedPassword,
      verificationCode: hashedotp,
      expireTime: expireTime,
    });
    //save data in db
    const user = await newUser.save();
    //send otp to email
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <tamalkumarkhan006@gmail.com>',
      to: `${email}`,
      subject: "Hello ✔",
      text: `${otp}`, // plain‑text body
      html: `<b>${otp}</b>`, // HTML body
    });

    console.log("Message sent:", info.messageId);
    res.json({ success: true, message: "otp send" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "otp not send" });
  }
};
////////////////////////////////////////////////////////////////////////
//verify the otp
const verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await userauthmodel.findOne({ email });
    const ismatch = await bycrypt.compare(otp, user.verificationCode);
    if (!user || !ismatch)
      return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > user.expireTime)
      return res.status(400).json({ message: "OTP expired" });
    user.isVerified = true;
    user.verificationCode = undefined;
    user.expireTime = undefined;
    await user.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
////////////////////////////////////////////////////////////////////////////
//get profile data
const profileData = async (req, res) => {
  const { userId } = req.body;
  // res.json({success:true,data:userId})
  try {
    //check if the email is present in the db
    const user = await userauthmodel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user doesnot exist" });
    }
    //res user profile data
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
export { loginUser, resisterUser, verifyEmailOTP, profileData };
