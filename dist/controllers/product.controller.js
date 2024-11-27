"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.fetchAllProducts();
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.send(500).json({ error: 'Unable to fetch all products' });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = yield product_model_1.default.fetchProductById(id);
        if (!product) {
            res.status(404).json({ error: "Product does not exist" });
            return;
        }
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.send(500).json({ error: 'Failed to get product' });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price } = req.body;
        const newProduct = yield product_model_1.default.createProduct({ productName, price });
        res.status(201).json(newProduct);
    }
    catch (err) {
        console.error(err);
        res.send(500).json({ error: 'Unable to add product' });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { productName, price } = req.body;
        const updatedProduct = yield product_model_1.default.updateProduct(id, { productName, price });
        res.json(updatedProduct);
    }
    catch (err) {
        console.error(err);
        res.send(500).json({ error: 'Unable to update product' });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deletedProduct = yield product_model_1.default.deleteProduct(id);
        if (!deletedProduct) {
            res.status(404).json({ error: "Product not found" });
        }
        res.json(deletedProduct);
    }
    catch (err) {
        console.error(err);
        res.send(500).json({ error: 'Unable to delete product' });
    }
});
exports.default = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
};
