import mongoose from "mongoose"

type User = {
    name: string,
    email: string,
    password: string,
    role :"librarian" | "reader"

}
const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ['librarian', 'reader'],
        default: 'reader'
    }

})

export const UserModel = mongoose.model<User>('User', userSchema)