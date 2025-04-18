import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        price:{
            type: Number,
            required: true,
            min: 0,
        },
        image: String,
        category: String,
        description:{
            type: String,
            required: true,
        },
        rating:{
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        }
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product