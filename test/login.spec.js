/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');
const app = require('../src/app');

const { expect } = chai;

chai.use(chaiHttp);
// require(user AND password); return JWT; return error;
describe('login', () => {
  it('Should receive user AND password to login', (done) => {
    chai.request(app)
      .post('/login')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Must have a user to login', (done) => {
    chai.request(app)
      .post('/login')
      .send({ password: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Must have a password to login', (done) => {
    chai.request(app)
      .post('/login')
      .send({ user: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should return a JWT on success', (done) => {
    chai.request(app)
      .post('/login')
      .send({ user: 'user', password: 'password' })
      .end((err, res) => {
        expect(res).to.be.json;
        expect(res.body).to.have.property('token');
        expect(res).to.have.status(200);
        done();
      });
  });
});
