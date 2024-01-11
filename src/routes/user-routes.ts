import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignUp,
  verifyUser,
} from "../controllers/user-controller.js";
import {
  loginValidator,
  signUpValidator,
  validate,
} from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), userSignUp);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);

export default userRouter;
