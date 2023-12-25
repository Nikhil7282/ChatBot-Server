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
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject();
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("Token Verification Successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map