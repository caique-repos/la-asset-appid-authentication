const request = require('supertest');
const app = require('../../src/server');

const route = '/signin';

describe('the route "/signin" canary spec', () => {
  it('shows the infrastructure works', () => {
    expect(true).toBe(true);
  });
});

describe('the route "/signin" should', () => {
  it('returns an error mensagem when called without any parameters', async () => {
    const res = await request(app).post(route).expect(400);

    expect(res.body.errors[0].msg).toEqual('The email field is required');
    expect(res.body.errors[1].msg).toEqual('The password field is required');
  });

  it('returns an error mensagem when called without the parameter "email"', async () => {
    const res = await request(app)
      .post(route)
      .send({ password: '12345678' })
      .expect(400);

    expect(res.body.errors[0].msg).toEqual('The email field is required');
  });

  it('returns an error mensagem when called without the parameter "password"', async () => {
    const res = await request(app)
      .post(route)
      .send({ email: 'test@email.com' })
      .expect(400);

    expect(res.body.errors[0].msg).toEqual('The password field is required');
  });

  it('returns an error mensagem when called with the "email" parameter in the wrong format', async () => {
    const res = await request(app)
      .post(route)
      .send({ email: 'testemail.com', password: '12345678' })
      .expect(400);

    expect(res.body.errors[0].msg).toEqual(
      'The email provided is in an invalid format'
    );
  });

  it('returns an error mensagem when called with the "password" parameter in the wrong type', async () => {
    const res = await request(app)
      .post(route)
      .send({ email: 'teste@mail.com', password: 12345678 })
      .expect(400);

    expect(res.body.errors[0].msg).toEqual('The password must be a string');
  });

  it('returns an error mensagem when called with the "password" parameter with less then 8 characters', async () => {
    const res = await request(app)
      .post(route)
      .send({ email: 'test@email.com', password: '1234567' })
      .expect(400);

    expect(res.body.errors[0].msg).toEqual(
      'The password must be at least 8 characters'
    );
  });

  it('returns an error mensagem when called with the supplied parameters "email" "password" not existing ', async () => {
    const res = await request(app)
      .post(route)
      .send({ email: 'teste@mail.com', password: '12345678' })
      .expect(400);

    expect(res.body.errors[0].msg).toEqual(
      'The email or password you entered is invalid'
    );
  });

  it.todo('returns an success mensagem when called with valid parameters');
});
