const app = require('../server');
const request = require('supertest');
const SECONDS = 10000;
const vendor = {
  _id: "675067f271e5462284991729",
  name: "Bayer",
  phone: "862-404-3000",
  address: "100 Bayer Boulevard Whippany, NJ 07981",
  rating: 5,
  itin: "123-45-6789",
};

describe('Testing vendors routes', () => {
  test(
    'Getting all vendors',
    async () => {
      const res = await request(app)
        .get('/vendors')
        .expect('Content-Type', /json/)
        .expect(200);
    },
    50 * SECONDS
  );
  test(
    'Finding a vendor by name',
    async () => {
      const res = await request(app)
        .get(`/vendors/findbyname/${vendor.name}`)
        .expect('Content-Type', /json/)
        .expect(200);
        expect(JSON.parse(res.text)).toMatchObject(vendor)
    },
    50 * SECONDS
  );
  test(
    'Finding a vendor by itin',
    async () => {
      const res = await request(app)
        .get(`/vendors/findbyitin/${vendor.itin}`)
        .expect('Content-Type', /json/)
        .expect(200);
        expect(JSON.parse(res.text)).toMatchObject(vendor);
    },
    50 * SECONDS
  );
});
