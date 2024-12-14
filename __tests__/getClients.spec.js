const app = require('../server');
const request = require('supertest');
const SECONDS = 10000;
const client = {
  _id: '675da5582245fce6da39314a',
  client_name: 'testName1',
  client_phone: '1223334444',
  client_address: '50 N W Temple St, Salt Lake City, UT 84150, United States',
  client_ssid: '1eabf2ef',
  client_purchases: [
    {
      purchase_date:
        'Sat Dec 14 2024 12:34:11 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '54',
      _id: '675da60f754b3f50bc35ad3d',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 12:38:59 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '5',
      _id: '675da6f988479d927bd110c8',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 12:38:59 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '5',
      _id: '675da70e88479d927bd110d5',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 13:18:18 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '6757a90899dcecd4a023ca54',
      quantity: '35',
      _id: '675db0099a2cf72762c6934d',
    },
  ],

  createdAt: '2024-12-14T15:33:44.421Z',
  updatedAt: '2024-12-14T16:19:21.379Z',
};

const ssid = '1eabf2ef';
const phone = '1223334444';
const routes = [
  {
    route: `/clients/findbyssid/${ssid}`,
    description: 'Get a client by a given ssid',
  },
  {
    route: `/clients/findbyphone/${phone}`,
    description: 'Get a client by a phone',
  },
];

describe('get all clients', () => {
  it(
    'returns status code 200 if there are clients on the database',
    async () => {
      const res = await request(app).get('/clients');

      expect(res.statusCode).toBe(200);
    },
    50 * SECONDS
  );

  it(
    'returns a header of content type json',
    async () => {
      const res = await request(app).get('/clients');
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
});

function refactoringCode(route, description) {
  describe(description, () => {
    it(
      'returns status code 200 if there is a client on the database with the paramater given',
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
    it('returns a json file similar to the one given', async () => {
      const res = await request(app).get(route);
      const json = JSON.parse(res.text);
      expect(json).toEqual(client);
    });
  });
}

for (let index = 0; index < routes.length; index++) {
  refactoringCode(routes[index].route, routes[index].description);
}

/*describe('Create a new client', () => {
  it(
    'returns a status of 200 if the client was created and a header of type application/json',
    async () => {
      const res = await request(app)
        .post('/clients')
        .send({
  client_name: 'testName1',
  client_phone: '1223334444',
  client_address: '50 N W Temple St, Salt Lake City, UT 84150, United States',
  client_ssid: '1eabf2ef',
  client_purchases: [
    {
      purchase_date:
        'Sat Dec 14 2024 12:34:11 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '54',
      _id: '675da60f754b3f50bc35ad3d',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 12:38:59 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '5',
      _id: '675da6f988479d927bd110c8',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 12:38:59 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '5',
      _id: '675da70e88479d927bd110d5',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 13:18:18 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '6757a90899dcecd4a023ca54',
      quantity: '35',
      _id: '675db0099a2cf72762c6934d',
    },
  ],

  createdAt: '2024-12-14T15:33:44.421Z',
  updatedAt: '2024-12-14T16:19:21.379Z',
})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
});

describe('update a client', () => {
  it(
    'returns a status of 200 if the client was updated and a header of type application/json',
    async () => {
      const res = await request(app)
        .put('/clients/675da5582245fce6da39314a')
        .send({
  client_name: 'testName1',
  client_phone: '1223334444',
  client_address: '50 N W Temple St, Salt Lake City, UT 84150, United States',
  client_ssid: '1eabf2ef',
  client_purchases: [
    {
      purchase_date:
        'Sat Dec 14 2024 12:34:11 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '54',
      _id: '675da60f754b3f50bc35ad3d',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 12:38:59 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '5',
      _id: '675da6f988479d927bd110c8',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 12:38:59 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '675d820a02f73906e7426e41',
      quantity: '5',
      _id: '675da70e88479d927bd110d5',
    },
    {
      purchase_date:
        'Sat Dec 14 2024 13:18:18 GMT-0300 (Horário Padrão de Brasília)',
      drug_id: '6757a90899dcecd4a023ca54',
      quantity: '35',
      _id: '675db0099a2cf72762c6934d',
    },
  ],

  createdAt: '2024-12-14T15:33:44.421Z',
  updatedAt: '2024-12-14T16:19:21.379Z',
})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
});

describe('delete a drug', () => {
  it(
    'returns a status of 200 if the client was deleted and a header of type application/json',
    async () => {
      const res = await request(app).delete('/clients/675da5582245fce6da39314a');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
});*/
