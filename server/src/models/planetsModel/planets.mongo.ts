import mongoose from "mongoose";
import { Planet } from "../../interfaces/Planets";

const planetSchema = new mongoose.Schema<Planet>({
    keplerName: {
        type: String,
        required: true
    },
    koi_disposition: {
        type: String,
        required: false
    },
    koi_insol: {
        type: Number,
        required: false
    },
    koi_prad: {
        type: Number,
        required: false
    }
});

export default mongoose.model("Planet", planetSchema);