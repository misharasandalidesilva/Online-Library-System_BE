import { Request, Response } from "express";
import { BookService } from "../services/book.service";

export class BookController {
    private bookService = new BookService();

    addBook = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (err) {
            res.status(500).json({ message: "Failed to create book", error: err });
        }
    };

    getAllBooks = async (req: Request, res: Response) => {
        try {
            const search = req.query.search as string | undefined;
            const books = await this.bookService.getAllBooks(search);
            res.json(books);
        } catch (err) {
            res.status(500).json({ message: "Failed to fetch books", error: err });
        }
    };

    getBookById = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.json(book);
        } catch (err) {
            res.status(500).json({ message: "Failed to fetch book", error: err });
        }
    };

    updateBook = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.updateBook(req.params.id, req.body);
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.json(book);
        } catch (err) {
            res.status(500).json({ message: "Failed to update book", error: err });
        }
    };

    deleteBook = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.deleteBook(req.params.id);
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.json({ message: "Book deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Failed to delete book", error: err });
        }
    };
}
