import { Router } from "express"
import {
    signup,
    login,
    refreshToken,
    logout,
    getAllUsers,
} from "../controllers/auth.controller"
import { authenticateToken } from "../middleware/auth.middleware"

const authRouter = Router()

// Public Routes
authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/refresh-token", refreshToken)
authRouter.post("/logout", logout)

// Protected Route
authRouter.get("/users", authenticateToken, getAllUsers)

export default authRouter


