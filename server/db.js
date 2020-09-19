import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/shake-shack', { useNewUrlParser: true });

const DatasetSchema = new mongoose.Schema(
    {
        name: { type: String },
        // TODO add more fields here
    },
    { timestamps: true }
);

export const Dataset = mongoose.model('Dataset', DatasetSchema);