import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    stockCount: number;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    stockCount: { type: Number, required: true, default: 0, min: 0 },
});

export const BookModel = mongoose.model<IBook>("Book", BookSchema);
