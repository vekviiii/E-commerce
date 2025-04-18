import mongoose from "mongoose"

const connection = async() => 
    {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URL)
            
            console.log(`Mongo db connected successfully to ${conn.connection.host}`);
            
        } catch (error) {
            console.error(`Unable to connect to Mongo db, error: ${error.message}`);
            process.exit(1)
        }
    }

export default connection