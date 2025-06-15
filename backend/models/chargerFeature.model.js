import mongoose from "mongoose";

const chargerFeatureSchema = new mongoose.Schema({
    key: {
        type: String,
    },
    value: {
        type: String,
    },
    // productId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Charger',
    // }

}, { timestamps: true })

export const ChargerFeature = mongoose.model("ChargerFeature", chargerFeatureSchema)