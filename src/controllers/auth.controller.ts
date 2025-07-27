import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../model/user.model"
import dotenv from "dotenv"

dotenv.config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!

const ACCESS_TOKEN_EXPIRATION = "15m"
const REFRESH_TOKEN_EXPIRATION = "7d"

let refreshTokens: string[] = [] // In-memory for now. Replace with DB/Redis in prod.


// Generate access token
const generateAccessToken = (user: any) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
    )
}

// Generate refresh token
const generateRefreshToken = (user: any) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" }
    )
}


// // Helper functions
// const generateAccessToken = (user: any) => {
//     return jwt.sign({ id: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
//         expiresIn: ACCESS_TOKEN_EXPIRATION,
//     })
// }

// const generateRefreshToken = (user: any) => {
//     const token = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
//         expiresIn: REFRESH_TOKEN_EXPIRATION,
//     })
//     refreshTokens.push(token)
//     return token
// }

// 🔐 Register User - POST /api/auth/signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, email, password, role } = req.body
        console.log("req.body eka awa ", req.body)

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const user = await UserModel.create({ name, email, password: hashedPassword, role })


        const userResponse = { _id: user._id, name: user.name, email: user.email , role: user.role}
        console.log("userResponse eka awa", userResponse)
        res.status(201).json(userResponse)

    } catch (err) {
        console.error("Login Error:", err);
        next(err);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await UserModel.findOne({ email })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        return res.json({ message: "Login successful", accessToken, refreshToken })
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ message: "Login failed", error: err })
    }
}


// 🔁 Refresh Token - POST /api/auth/refresh-token
export const refreshToken = (req: Request, res: Response) => {
    const { token } = req.body
    if (!token) return res.status(401).json({ message: "Token required" })
    if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid refresh token" })

    jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: "Token verification failed" })

        const newAccessToken = generateAccessToken({ _id: user.id, role: user.role })
        res.json({ accessToken: newAccessToken })
    })
}

// 🚪 Logout - POST /api/auth/logout
export const logout = (req: Request, res: Response) => {
    const { token } = req.body
    refreshTokens = refreshTokens.filter(t => t !== token)
    res.json({ message: "Logged out successfully" })
}

// 👥 Get All Users - GET /api/auth/users (secured)
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find().select("-password")
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve users", error: err })
    }
}
