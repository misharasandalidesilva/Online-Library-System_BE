import { ReaderModel } from "../model/reader.model";

export const createReader = async (data: any) => {
    const reader = new ReaderModel(data);
    return await reader.save();
};

export const getAllReaders = async () => {
    return await ReaderModel.find();
};

export const updateReader = async (id: string, data: any) => {
    return await ReaderModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteReaderById = async (id: string) => {
    return await ReaderModel.findByIdAndDelete(id);
};
