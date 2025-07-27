import express from "express";
import authRouter from "./routes/auth.routes"; // ✅ make sure path is correct
import DBConnection from "./db/DBConnection";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json()); // ✅ parse JSON body

// Connect to DB
DBConnection()
    .then((msg) => console.log(msg))
    .catch((err) => console.error(err));

// Register routes
app.use("/api/auth", authRouter); // ✅ Prefix is /api/auth

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});






// import app from "./app";
// import dotenv from "dotenv";
// import DBConnection from "./db/DBConnection";
//
// dotenv.config();
//
// const port = process.env.PORT || 3000;
//
// DBConnection()
//     .then(() => console.log("Database connected"))
//     .catch((err) => console.error("DB connection error:", err));
//
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });
