import { Router } from 'express'
import { PostProduct, GetProduct, DeleteProduct, UpdateProduct, GetProductById } from '../controllers/productController.js'


const route = Router()

//GET
route.get('/products', GetProduct)
route.get('/product/:id', GetProductById)

//POST
route.post('/product', PostProduct)

//UPDATE
route.put('/product/:id', UpdateProduct)

//DELETE
route.delete('/product/:id', DeleteProduct)

export default route