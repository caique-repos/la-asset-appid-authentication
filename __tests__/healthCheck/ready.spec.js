const request = require('supertest');
const app = require('../../src/server');

const route = '/live';

describe('the route "/health" canary spec', () => {
  it('shows the infrastructure works', () => {
    expect(true).toBe(true);
  });
});

describe('the route "/health" should', () => {
  it('returns a status 200 when called', () => {
    return request(app).get(route).expect(200);
  });
});
