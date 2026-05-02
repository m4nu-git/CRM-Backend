import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe("sample test endpoint", () => {

    test("should return response on ping", async () => {
        const response = await request.get("/ping");
        expect(response.status).toBe(200)
    })
})