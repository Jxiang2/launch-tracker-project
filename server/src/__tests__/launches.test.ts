import { app } from "../app";
import request from "supertest";

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/launches')
            .expect(200);
    });
});

describe('Test POST /launches', () => {

    const launchDataWithInvalidDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "jxx 4, 202x8"
    };

    const completeLaunchData = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "january 4, 2028"
    };

    const launchDataWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
    };

    test('It should respond with 200 success', async () => {
        const res = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const resDate = new Date(res.body.launchDate).valueOf();
        expect(requestDate).toBe(resDate);
        // match a subset is enough
        expect(res.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const res = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        // strictly match every properties
        expect(res.body).toStrictEqual({
            error: "Missing required launch property"
        });
    });

    test('It should catch invalid dates', async () => {
        const res = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        // strictly match every properties
        expect(res.body).toStrictEqual({
            error: "Invalid launch date"
        });
    });
});

