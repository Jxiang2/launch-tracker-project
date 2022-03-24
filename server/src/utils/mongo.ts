require('dotenv').config();
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "invalid url";

// setup mongoose listeners
mongoose.connection.once('open', () => console.log('mongoDB connection ready'));
mongoose.connection.on('error', (err) => console.error(err));


async function connectMongoDB () {
    await mongoose.connect(MONGO_URL);
}

async function disconnectMongoDB () {
    await mongoose.disconnect();
}

export {
    connectMongoDB,
    disconnectMongoDB
};
