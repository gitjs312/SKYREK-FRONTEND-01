import User from "../models/user.js";

export function createUser(req, res) {
    const user=new User({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password

    })
    user.save().then(
        ()=>{
            req.json({
                message: "user created successfully..."
            })
            
        }
    ).catch(
        ()=> {
            res.json({
                message:"user creation failed..."
            })
        }
    )
}




