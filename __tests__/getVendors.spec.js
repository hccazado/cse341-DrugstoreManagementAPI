const app = require('../server');
const request = require('supertest');
const SECONDS = 10000;
const vendor = {
  _id: "6754799488e167af08b597c0",
  name: "Johnson & Johnson",
  phone: "800-876-4596",
  address: "7500 Centurion Parkway North Jacksonville, Florida 32256",
  rating: 5,
  itin: "123-45-9786",
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
