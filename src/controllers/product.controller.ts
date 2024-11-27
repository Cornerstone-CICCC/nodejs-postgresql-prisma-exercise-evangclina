import { Request, Response } from "express";
import productModel from "../models/product.model";
import { Product } from "@prisma/client";

const getAllProducts = async (req: Request, res: Response) =>{
    try{
        const products = await productModel.fetchAllProducts()
        res.json(products) 
    }catch(err){
        console.error(err)
        res.send(500).json({ error: 'Unable to fetch all products' })
    }
}

const getProductById = async (req: Request <{ id: string }>, res: Response) => {
    try{
        const id = Number(req.params.id)
        const product = await productModel.fetchProductById(id)
        if(!product){
            res.status(404).json({ error: "Product does not exist" })
            return
        }
        res.json(product)
    }catch(err){
        console.error(err)
        res.send(500).json({ error: 'Failed to get product' })
    }
}

const addProduct = async(req: Request, res: Response) => {
    try{
        const { productName, price } = req.body
        const newProduct = await productModel.createProduct({ productName, price })
        res.status(201).json(newProduct)
    }catch(err){
        console.error(err)
        res.send(500).json({ error: 'Unable to add product' })
    }
}

const updateProductById = async (req: Request <{ id: string}, {}, Omit<Product, 'id'>>, res: Response) => {
    try{
        const id = Number(req.params.id)
        const {productName, price} = req.body
        const updatedProduct = await productModel.updateProduct(id, {productName, price})
        res.json(updatedProduct)
    }catch(err){
        console.error(err)
        res.send(500).json({ error: 'Unable to update product' })
    }
}

const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const id = Number(req.params.id)
        const deletedProduct = await productModel.deleteProduct(id)
        if(!deletedProduct){
            res.status(404).json({ error: "Product not found" })
        }
        res.json(deletedProduct) 
    }catch(err){
        console.error(err)
        res.send(500).json({ error: 'Unable to delete product' })
    }
}

export default {
    getAllProducts, 
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
}