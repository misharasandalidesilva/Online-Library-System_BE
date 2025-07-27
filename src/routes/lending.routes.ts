import { Router } from "express";
import {
    landbook,
    getAllRecords,
    getRecordByReaderId,
    getRecordByBookId,
    updatereturnDate,
    updateRecord,
    deleteRecord,
} from "../controllers/lending.controller";

const lendingRouter = Router();

lendingRouter.post("/", landbook);
lendingRouter.get("/", getAllRecords);
lendingRouter.get("/reader/:readerId", getRecordByReaderId);
lendingRouter.get("/book/:bookId", getRecordByBookId);
lendingRouter.patch("/:id/return-date", updatereturnDate);
lendingRouter.put("/:id", updateRecord);
lendingRouter.delete("/:id", deleteRecord);

export default lendingRouter;
