import express from "express";
import authRouter from "./routes/auth.routes";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/book.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
// Mount book routes
app.use("/api/books", bookRoutes);

export default app;



