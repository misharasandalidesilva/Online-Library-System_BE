import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Handle Mongoose-specific errors
    if (error instanceof mongoose.Error) {
        return res.status(400).json({ message: error.message });
    }

    // Handle cast errors (e.g., invalid ObjectId)
    if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    // Handle all other errors
    console.error("Unhandled Error:", error);
    res.status(500).json({ message: "Internal server error" });
};
