import { BookModel, IBook } from "../model/book.model";

export class BookService {
    async createBook(data: Partial<IBook>): Promise<IBook> {
        const book = new BookModel(data);
        return book.save();
    }

    async getAllBooks(search?: string): Promise<IBook[]> {
        let query = {};
        if (search) {
            const regex = new RegExp(search, "i");
            query = {
                $or: [
                    { title: regex },
                    { author: regex },
                    { genre: regex },
                    { isbn: regex },
                ],
            };
        }
        return BookModel.find(query).exec();
    }

    async getBookById(id: string): Promise<IBook | null> {
        return BookModel.findById(id).exec();
    }

    async updateBook(id: string, data: Partial<IBook>): Promise<IBook | null> {
        return BookModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
    }

    async deleteBook(id: string): Promise<IBook | null> {
        return BookModel.findByIdAndDelete(id).exec();
    }
}
