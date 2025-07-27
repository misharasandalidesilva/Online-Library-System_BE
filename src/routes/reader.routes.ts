import { Router } from "express";
import {
    createReaderController,
    getAllReadersController,
    editReaderController,
    deleteReaderController,
} from "../controllers/reader.controller";

const readerRouter = Router();

readerRouter.post("/", createReaderController);
readerRouter.get("/", getAllReadersController);
readerRouter.put("/:id", editReaderController);
readerRouter.delete("/:id", deleteReaderController);

export default readerRouter;
