import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {
        type:String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    altNames: {
        type:[String],
        defaule:[]
    },
    price:{
        type: Number,
        required: true
    },
    category: {
        type:String,
        default : "others"
    
    },
    images:{
        type:[String],
        default: ["ship-2178449_1280"]
    },
    isVisible:{
        type: Boolean,
        default: true,
        required: true
    },
    brand:{
        type:"String",
        default: "Generic"
    }


    

})
const prdouct=mongoose.model("product", productSchema)

export default productSchema;