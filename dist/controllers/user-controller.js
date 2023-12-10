import user from "../models/user.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { Cookie_Name } from "../utils/constant.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find();
        return res.status(201).json({ message: "OK", users });
    }
    catch (error) {
        return res.status(200).json({ message: "Error", cause: error });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User Already Exists" });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();
        res.clearCookie(Cookie_Name, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(200).json({ message: "Error", cause: error });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, User.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(Cookie_Name, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = await createToken(User._id.toString(), User.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(Cookie_Name, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(200).json({ message: "Error", cause: error });
    }
};
//# sourceMappingURL=user-controller.js.map