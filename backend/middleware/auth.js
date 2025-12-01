import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    //take token from headers
    const {token}=req.headers;
    if(!token){
        return res.json({success:false, message: "not authorized" });
    }
    try{
        const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decoded.id;       //add a new data in the req which is the id
        next();
    }catch(error){
        console.log(error);
        return res.json({success:false, message: "auth error" });
    }
};
export default authMiddleware;
