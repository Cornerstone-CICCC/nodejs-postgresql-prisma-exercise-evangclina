import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient()

const fetchAllProducts = async () => {
    return await prisma.product.findMany()
}

const fetchProductById = async(id: number) => {
    return await prisma.product.findUnique({ where: {id} })
}

const createProduct = async (data: Omit<Product, "id">) => {
    return await prisma.product.create({ data })
}

const updateProduct = async( id: number, data: Partial<Product>) => {
    return await prisma.product.update({ where: { id }, data })
}

const deleteProduct = async (id: number) => {
    return await prisma.product.delete({ where: {id} })
}

export default {
    fetchAllProducts,
    fetchProductById, 
    createProduct,
    updateProduct, 
    deleteProduct
}