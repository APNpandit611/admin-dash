import mongoose from "mongoose";

const chargerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        
        description: {
            type: String,
        },
        images: {
            type: [String],
        },
        brand: {
            type: String,
        },
        compatibleBrands: [
            {
                type: String,
            },
        ],
        feature: [
            // {
            // // type: mongoose.Schema.Types.ObjectId,
            // // ref: "ChargerFeature",
            // },
            {
                title: { type: String},
                detail: { type: String},
            },
        ],
        review: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }]
    },
    { timestamps: true }
);

export const Charger = mongoose.model("Charger", chargerSchema);
