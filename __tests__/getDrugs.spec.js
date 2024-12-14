const app = require('../server');
const request = require('supertest');
const SECONDS = 10000;
const drug = [
  {
    _id: '675864a70cb0be4b8bc4beb1',
    commercialName: 'Advil Maximum Strength Testing',
    scientificName: 'Ibuprofen Testing',
    VendorId: '675067f271e5462284991729',
    expireDate: '2025-08-15',
    doses: '500 mg',
    description:
      'Maximum strength version of Ibuprofen for intense pain relief.',
    category: 'Painkiller Testing',
    createdAt: '2024-12-10T15:56:23.662Z',
  },
];

const id = '675864a70cb0be4b8bc4beb1';
const commercialName = 'advil-maximum-strength-testing';
const scientificName = 'ibuprofen-testing';
const category = 'painkiller-testing';
const routes = [
  { route: `/drugs/${id}`, description: 'Get a drug by a given id' },
  {
    route: `/drugs/cn/${commercialName}`,
    description: 'Get a drug by a commercial name',
  },
  {
    route: `/drugs/sn/${scientificName}`,
    description: 'Get drugs by a scientific name',
  },
  {
    route: `/drugs/category/${category}`,
    description: 'Get drugs by category',
  },
];

describe('get all drugs', () => {
  it(
    'returns status code 200 if there are drugs on the database',
    async () => {
      const res = await request(app).get('/drugs');

      expect(res.statusCode).toBe(200);
    },
    50 * SECONDS
  );

  it(
    'returns a header of content type json',
    async () => {
      const res = await request(app).get('/drugs');
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
      'returns status code 200 if there is a drug on the database with the paramater given',
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
      expect(json).toEqual(drug);
    });
  });
}

for (let index = 0; index < routes.length; index++) {
  refactoringCode(routes[index].route, routes[index].description);
}

/*describe('Create a new drug', () => {
  it(
    'returns a status of 200 if the drug was created and a header of type application/json',
    async () => {
      const res = await request(app)
        .post('/drugs')
        .send({
          commercialName: 'Zithromax Ultra Testing',
          scientificName: 'Azithromycin Testing',
          expireDate: '2024-09-18',
          doses: '1000 mg',
          description:
            'Ultra-strength version of Zithromax for severe infections.',
          category: 'Antibiotic Testing',
          VendorId: '675067f271e5462284991729',
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

describe('update a drug', () => {
  it(
    'returns a status of 200 if the drug was updated and a header of type application/json',
    async () => {
      const res = await request(app)
        .put('/drugs/67579b00497edc872d02bddf')
        .send({
          commercialName: 'Zithromax Ultra Testing more',
          scientificName: 'Azithromycin Testing',
          expireDate: '2024-09-18',
          doses: '1000 mg',
          description:
            'Ultra-strength version of Zithromax for severe infections.',
          category: 'Antibiotic Testing',
          VendorId: '675067f271e5462284991729',
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
    'returns a status of 200 if the drug was deleted and a header of type application/json',
    async () => {
      const res = await request(app).delete('/drugs/675d8c7f57f235ba5b755857');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    },
    50 * SECONDS
  );
});*/
