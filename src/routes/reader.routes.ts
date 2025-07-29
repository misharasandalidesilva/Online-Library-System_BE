import { Router } from "express";
import {
    createReaderController,
    getAllReadersController,
    editReaderController,
    deleteReaderController,
} from "../controllers/reader.controller";

const readerRouter = Router();

readerRouter.post("/add", createReaderController);
readerRouter.get("/getAll", getAllReadersController);
readerRouter.put("/:id", editReaderController);
readerRouter.delete("/:id", deleteReaderController);

export default readerRouter;
