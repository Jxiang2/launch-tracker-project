import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://nasa-api:wWerad8lEAXOUeT7@cluster0.qe704.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
