import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating:  {
        type: Number,
        required: true,
        default: 1
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Charger',
    }
}, { timestamps: true })

export const Review = mongoose.model("Review", reviewSchema)