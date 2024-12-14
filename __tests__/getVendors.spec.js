const app = require("../server");
const request = require("supertest");
describe("Testing vendors routes", ()=>{
    test("Getting all vendors", async () => {
        const res = await request(app)
        .get("/vendors")
        .expect('Content-Type', /json/)
        .expect(200)
    });
    test("Finding a vendor by name", async () => {
        const res = await request(app)
        .get("/vendors/findbyname/bayer")
        .expect('Content-Type', /json/)
        .expect(200)
    });
    test("Finding a vendor by itin", async () => {
        const res = await request(app)
        .get("/vendors/findbyitin/123-54-6897")
        .expect('Content-Type', /json/)
        .expect(200)
    });
})