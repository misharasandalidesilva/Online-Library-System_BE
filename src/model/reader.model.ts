import mongoose from "mongoose"

type Reader = {
    first_name: string
    last_name: string
    email: string
    age: number
    address: string
    phone: string
    join_date: Date
}

const readerSchema = new mongoose.Schema<Reader>({
    first_name: {
        type: String,
        trim: true,
    },

    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        trim: true,
    },
    address:{
        type: String,
        trim: true,
    },
    phone:{
        type: String,
        trim: true,
    },
    join_date: {
        type: Date,
        default: Date.now,
    },
})

export const ReaderModel = mongoose.model<Reader>("Reader",readerSchema)