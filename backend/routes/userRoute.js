import express from "express";
import { loginUser, profileData, resisterUser,verifyEmailOTP } from "./../controllers/userControler.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/resister", resisterUser);
userRouter.post("/verifyOtp", verifyEmailOTP);
userRouter.post("/login", loginUser);
userRouter.post("/profile", authMiddleware,profileData);
export default userRouter;