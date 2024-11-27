// Set up your server
import express from "express"
import productRouter from "./routes/product.routes"
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

app.use("/products", productRouter)

const PORT = process.env.PORT || 3400
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})