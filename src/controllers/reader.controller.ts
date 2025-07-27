import { Request, Response, NextFunction } from "express";
import {createReader, getAllReaders, updateReader, deleteReaderById,
} from "../services/reader.service";

export const createReaderController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reader = await createReader(req.body);
        res.status(201).json(reader);
    } catch (err) {
        next(err);
    }
};

export const getAllReadersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const readers = await getAllReaders();
        res.status(200).json(readers);
    } catch (err) {
        next(err);
    }
};

export const editReaderController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reader = await updateReader(req.params.id, req.body);
        if (!reader) return res.status(404).json({ message: "Reader not found" });
        res.status(200).json(reader);
    } catch (err) {
        next(err);
    }
};

export const deleteReaderController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reader = await deleteReaderById(req.params.id);
        if (!reader) return res.status(404).json({ message: "Reader not found" });
        res.status(200).json({ message: "Reader deleted successfully" });
    } catch (err) {
        next(err);
    }
};
