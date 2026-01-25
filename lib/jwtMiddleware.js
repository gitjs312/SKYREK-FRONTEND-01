import jwt from "jsonwebtoken";

export default function authorizeUser(req, res, next){
    const header = req.headers['authorization'];

    if(header){ 
        const token = header.replace("Bearer ", "")
        console.log(token)

        jwt.verify(token, "i-computers-54!", (err, decoded)=>{
            if(decoded == null){
                res.status(401).json({
                    message: "unauthorized access"
                })
            } else {
                req.user = decoded
                next()
            }
        })

    } else {
        next()
    }
}