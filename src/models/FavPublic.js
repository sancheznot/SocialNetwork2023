import { Schema, model, models } from 'mongoose';

const favPublicSchema = new Schema({
    favpublic: {
        type: [Schema.Types.ObjectId],
        ref: 'Photos',
    },
});