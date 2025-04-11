import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protectRoute = async (req, res, next) =>{
   try {

    // get token
    const token = req.headers["Authorization"].replace("Bearer" , "")

    if(!token){
        return res.status(401).json("Token not provided. Access denied")
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //find user

    const user = User.findById(decoded.userId).select("-password")

    if(!user){
        return res.status(403).json({message: "Unauthorized, invalid token"})
    }


    // send user to the next handler
    req.user = user
    next()

   } catch (error) {
    console.error("Authenticaion error", error)
    res.status(401).json({message: "Token is not valid"})

    
   }
}

export default protectRoute