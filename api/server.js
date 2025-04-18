import 'dotenv/config'
import connection from './config/db.js'
import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Connect to DB
connection()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json())

app.use('/api', [productRoutes, authRoutes])

// Routes
app.get("/", (req, res) => res.send("Connected"))

// Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API connected at port: ${PORT}`))