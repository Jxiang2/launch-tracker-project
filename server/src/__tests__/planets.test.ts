import { app } from "../app";
import request from "supertest";

describe('Test GET /planets', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/planets')
            .expect(200);
    });
});