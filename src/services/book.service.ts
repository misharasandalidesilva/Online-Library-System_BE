import BookModel from "../model/book.model";

export const createBook = async (bookData: any) => {
    const book = new BookModel(bookData);
    return await book.save();
};

export const getAllBooks = async () => {
    return await BookModel.find();
};

export const updateBook = async (id: string, updateData: any) => {
    return await BookModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

export const deleteBookById = async (id: string) => {
    return await BookModel.findByIdAndDelete(id);
};
