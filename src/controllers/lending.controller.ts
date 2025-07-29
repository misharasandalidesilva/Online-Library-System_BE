import { Request, Response, NextFunction } from "express";
import BookModel from "../model/book.model";
import { ReaderModel } from "../model/reader.model";
import {
    createLending,
    getAllLendings,
    getLendingsByReaderId,
    getLendingsByBookId,
    updateReturnDate,
    updateLending,
    deleteLending,
} from "../services/lending.service";
import {LendingModel} from "../model/lending.model";

// Create lending record
export const landbook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId, readerId, lendDate, dueDate, returnDate, status } = req.body;

        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const reader = await ReaderModel.findById(readerId);
        if (!reader) return res.status(404).json({ message: "Reader not found" });

        const lending = await createLending({ bookId, readerId, lendDate, dueDate, returnDate, status });
        res.status(201).json(lending);
    } catch (err) {
        next(err);
    }
};

// Get all lending records
export const getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await getAllLendings();
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
};

// Get lending records by reader ID
export const getRecordByReaderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await getLendingsByReaderId(req.params.readerId);
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
};

// Get lending records by book ID
export const getRecordByBookId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await getLendingsByBookId(req.params.bookId);
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
};

// Update return date only
export const updatereturnDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { returnDate } = req.body;
        const updated = await updateReturnDate(req.params.id, returnDate);
        if (!updated) return res.status(404).json({ message: "Lending record not found" });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// Update lending record (any fields)
export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await updateLending(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Lending record not found" });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// Delete lending record
export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await deleteLending(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Lending record not found" });
        res.status(200).json({ message: "Lending record deleted successfully" });
    } catch (err) {
        next(err);
    }
};

export const getAllOverdueRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const today = new Date();
        const overdueRecords = await LendingModel.find({
            dueDate: { $lt: today },
            status: "borrowed"
        });
        res.status(200).json(overdueRecords);
    } catch (err) {
        next(err);
    }
}

export const markAsReturn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const lending = await LendingModel.findById(id);
        if (!lending) {
            return res.status(404).json({ message: "Lending record not found" });
        }
        lending.status = "returned";
        await lending.save();
        res.status(200).json(lending);
    } catch (err) {
        next(err);
    }
}