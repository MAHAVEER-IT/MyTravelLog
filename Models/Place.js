import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const placeShema = mongoose.Schema({
    id: { type: String, default: uuidv4() },
    placeName: { type: String, required: true },
    nearBy: { type: String, required: true },
    BaseImg: { type: String, required: true },
    BestTime: { type: String, default: 'Any Time' },
    imgURL: [String],
    about: String,
    content:String,
    labels: [String],
    comments: [{
        name: String,
        comment: String
    }]
})

export const Place = mongoose.models.Place || mongoose.model('Place', placeShema);