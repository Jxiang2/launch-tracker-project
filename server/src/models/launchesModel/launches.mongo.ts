import mongoose from "mongoose";
import { Launch } from "../../interfaces/Launches";

const launchesSchema = new mongoose.Schema<Launch>({
    flightNumber: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
        max: 999
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    target: {
        type: String,
        required: false
    },
    customers: {
        type: [String]
    },
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        default: true,
        required: true
    },
});

// Connect launchChema with the "launches" collection
export default mongoose.model("Launch", launchesSchema);