import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export async function createProduct(req, res){

   if(!isAdmin(req)){
        res.status(403).json({
            message: "no access, access for admin only"
        });
        return;
    }

    try{
        const existingProduct = await Product.findOne({
            productId: req.body.productId
        });

        if(existingProduct){
            res.status(400).json({
                message: "product with given id already exists"
            });
            return;
        }

        const data = {};
        data.productId = req.body.productId;

        if(req.body.name == null){
            res.status(400).json({
                message: "product name is required"
            });
            return;
        }
        data.name = req.body.name;

        data.description = req.body.description || "";
        data.altNames = req.body.altNames || [];

        if(req.body.price == null){
            res.status(400).json({
                message: "product price is required..."
            });
            return;
        }

        data.price = req.body.price;
        data.labelledPrice = req.body.labelledPrice || req.body.price;
        data.category = req.body.catagory || "others";
        data.images = req.body.images || [
            "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29"
        ];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "Generic";
        data.model = req.body.model || "standard";

        const newProduct = new Product(data);
        await newProduct.save();

        res.status(201).json({
            message: "product created successfully"
        });

    }
    catch(error){
        res.status(500).json({
            message: "error creating product"
        });
    }
}

export async function getProducts(req, res) {
    try {
        if(isAdmin(req)){
            const products = await Product.find();
            res.status(200).json(products);
        }
        else{
            const products = await Product.find({ isVisible: true });
            res.status(200).json(products);
        }
    }
    catch (error) {
        res.status(500).json({
            message: "error fetching products"
        });
    }
}

export async function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "you are not admin"
        });
        return;
    }

    try{
        await Product.deleteOne({
            productId: req.body.productId
        });

        res.status(200).json({
            message: "product deleted successfully"
        });
    }
    catch{
        res.status(500).json({
            message: "error deleting product"
        });
    }
}

