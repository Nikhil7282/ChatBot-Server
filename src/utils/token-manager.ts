import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Cookie_Name } from "./constant.js"

export const createToken=async(id:string,email:string,expiresIn)=>{
    const payload={id,email}
    const token=await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    return token
}

export const verifyToken=async (req:Request,res:Response,next:NextFunction) => {
    const token=req.signedCookies[`${Cookie_Name}`]
    console.log(token);
    
}