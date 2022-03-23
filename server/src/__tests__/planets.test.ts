import { app } from "../app";
import request from "supertest";
import { connectMongoDB, disconnectMongoDB } from "../mongo";



describe("Planet API", () => {
    beforeAll(async () => {
        await connectMongoDB();
        console.log("Connected to test mongoDB");

    });

    afterAll(async () => {
        await disconnectMongoDB();
        console.log("Disconnted to test mongoDB");

    });

    describe('Test GET /planets', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .get('/planets')
                .expect(200);
        });
    });
});

