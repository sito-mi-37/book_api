import express from "express"
import "dotenv/config" 
import { connectDb } from "./lib/db.js"
import cors from "cors"

// routes
import authRoute from "./routes/authRoutes.js"
import bookRoute from "./routes/bookRoutes.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())


app.use("/api/auth", authRoute)
app.use("/api/book", bookRoute)


app.listen(PORT, () =>{
    console.log(`app running on port: ${PORT}`)
    connectDb() 
})
