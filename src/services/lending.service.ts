import { LendingModel } from "../model/lending.model";

export const createLending = async (data: any) => {
    const lending = new LendingModel(data);
    return await lending.save();
};

export const getAllLendings = async () => {
    return await LendingModel.find();
};

export const getLendingsByReaderId = async (readerId: string) => {
    return await LendingModel.find({ readerId });
};

export const getLendingsByBookId = async (bookId: string) => {
    return await LendingModel.find({ bookId });
};

export const updateReturnDate = async (id: string, returnDate: Date) => {
    const lending = await LendingModel.findById(id);
    if (!lending) return null;
    lending.returnDate = returnDate;
    return await lending.save();
};

export const updateLending = async (id: string, data: any) => {
    return await LendingModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteLending = async (id: string) => {
    return await LendingModel.findByIdAndDelete(id);
};
