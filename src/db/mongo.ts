import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to DB", error)
    process.exit(1)
  }
}
