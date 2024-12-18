const app = require('../server');
const request = require('supertest');
const SECONDS = 10000;
const order = [
  {
    _id: '675daf629a2cf72762c69335',
    client_id: '675da5582245fce6da39314a',
    drugId: '6757a90899dcecd4a023ca54',
    quantity: '5',
  },
];

const id = '675daf629a2cf72762c69335';
const route = '/store';

describe('get orders', () => {
  it(
    'returns status code 200 if there are orders on the database',
    async () => {
      const res = await request(app).get(route);

      expect(res.statusCode).toBe(200);
    },
    50 * SECONDS
  );

  it(
    'returns a header of content type json',
    async () => {
      const res = await request(app).get(route);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
});

describe('get an order by a specific id', () => {
  it(
    'returns status code 200 if there is a order on the database with the paramater given',
    async () => {
      const res = await request(app).get(route + '/' + id);
      expect(res.statusCode).toBe(200);
    },
    50 * SECONDS
  );
  it(
    'returns a header of content type json',
    async () => {
      const res = await request(app).get(route + '/' + id);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
  it('returns a json file similar to the one given', async () => {
    const res = await request(app).get(route + '/' + id);
    const json = JSON.parse(res.text);
    expect(json).toMatchObject(order);
  });
});
