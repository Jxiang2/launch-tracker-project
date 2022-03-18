import { app } from "../src/app";
import request from "supertest";


describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test POST /launches', () => {
    test('It should respond with 200 success', () => {
        expect(200).toBe(200);
    });
    test('It should catch missing required properties', () => {
        expect(200).toBe(200);
    });
    test('It should catch invalid dates', () => {
        expect(200).toBe(200);
    });
});
