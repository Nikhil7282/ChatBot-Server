import jwt from "jsonwebtoken";
import { Cookie_Name } from "./constant.js";
export const createToken = async (id, email, expiresIn) => {
    const payload = { id, email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${Cookie_Name}`];
    console.log(token);
};
//# sourceMappingURL=token-manager.js.map