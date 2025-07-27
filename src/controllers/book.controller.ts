import { Request, Response, NextFunction } from "express";
import {
    createBook,
    getAllBooks,
    updateBook,
    deleteBookById,
} from "../services/book.service";

// POST /api/books
export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

// GET /api/books
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

// PUT /api/books/:id
export const editBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await updateBook(req.params.id, req.body);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/books/:id
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await deleteBookById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        next(err);
    }
};
