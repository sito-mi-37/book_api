import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected at: ${conn.connection.host}`)
    } catch (error) {
        console.log("failed to connect to database", error);
        process.exit(1) //exit with failure
    }
}

