import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/shake-shack', { useNewUrlParser: true });

const DatasetSchema = new mongoose.Schema(
    {
        data: { type: [Object] }
    },
    { timestamps: true }
);

export const Dataset = mongoose.model('Dataset', DatasetSchema);