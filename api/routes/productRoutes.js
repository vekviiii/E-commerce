import { Router } from 'express'
import { PostProduct, GetProduct, DeleteProduct, UpdateProduct, GetProductById, processPayment, getKey, paymentVerification } from '../controllers/productController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const route = Router()

//GET
route.get('/products', authMiddleware, GetProduct)
route.get('/product/:id', GetProductById)
route.get('/getKey', getKey)

//POST
route.post('/product',authMiddleware, PostProduct)
route.post('/payment', processPayment)
route.post('/paymentVerification', paymentVerification)

//UPDATE
route.put('/product/:id',authMiddleware, UpdateProduct)

//DELETE
route.delete('/product/:id', authMiddleware, DeleteProduct)

export default route