import 'dotenv/config'
import connection from './config/db.js'
import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import Razorpay from 'razorpay'
import cors from 'cors'

const app = express()

// Connect to DB
connection()

//Razor instance
export var instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
  });

app.use(cors())

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())


app.use('/api', [productRoutes, authRoutes])

app.get("/", (req, res) => res.send("Connected"))

// global error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API connected at port: ${PORT}`))