import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();
const bookController = new BookController();

router.get("/", bookController.getAllBooks);
router.post("/", authenticateToken, bookController.addBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", authenticateToken, bookController.updateBook);
router.delete("/:id", authenticateToken, bookController.deleteBook);

export default router;
