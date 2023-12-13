import { Router } from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/user-controller.js";
import { loginValidator, signUpValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter=Router()

userRouter.get('/',getAllUsers)
userRouter.post('/signup',validate(signUpValidator),userSignUp)
userRouter.post('/login',validate(loginValidator),userLogin)
userRouter.get('/auth-status',verifyToken,userLogin)

export default userRouter