import { Router } from 'express'
import { PostProduct, GetProduct, DeleteProduct, UpdateProduct, GetProductById } from '../controllers/productController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const route = Router()

//GET
route.get('/products', GetProduct)
route.get('/product/:id', GetProductById)

//POST
route.post('/product',authMiddleware, PostProduct)

//UPDATE
route.put('/product/:id',authMiddleware, UpdateProduct)

//DELETE
route.delete('/product/:id', authMiddleware, DeleteProduct)

export default route