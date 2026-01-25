
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user=new User({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,

    })
    user.save().then(
        ()=>{
            res.json({
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

export function loginUser(req, res) {
    User.findOne({
        email: req.body.email
    }).then(
        (user)=>{
            if(user==null){
                res.json({
                    message: "user with given email is not found",
                    
                })
            }
            else{
                const isPasswordValid=bcrypt.compareSync(req.body.password , user.password)
                console.log(isPasswordValid)

                if(isPasswordValid){

                    const token=jwt.sign({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        image: user.image,
                        isEmailVerified: user.isEmailVerified
                    }, "i-computers-54!")

                    console.log("Generated Token:", token);
                    console.log({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        image: user.image,
                        isEmailVerified: user.isEmailVerified
                    })

                    
                        res.json({
                            message:"login successful",
                            token: token,
                        })
                    
                }
                else{
                    res.status(401).json({
                        message:"password failed"
                    })
                }
                
                
            }
        }
    )
    }
    export function isAdmin(req) {
        if(req.user.role==null){
            return false;
        }
        if(req.user.role=="admin"){
            return true;
        }
        else{
            return false;
        }
    }








