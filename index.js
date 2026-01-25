import express from 'express'

import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import authorizeUser from './lib/jwtMiddleware.js';





let mongoURI = "mongodb+srv://admin:1234@cluster0.jg4p067.mongodb.net/MYDB?appName=Cluster0";

mongoose.connect(mongoURI)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.log("MongoDB connection error:", err)
})

let app = express();

app.use(express.json());

app.use(authorizeUser)

app.use("/Users", userRouter)
app.use("/Products", productRouter)

app.listen(3000, ()=>{
    console.log("server started...")
})
