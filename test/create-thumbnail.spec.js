const chai = require('chai');
const {expect} = chai;
const app = require('../src/app');
const chaiHttp = require('chai-http');
const jwt = require('../src/jwt');

chai.use(chaiHttp);
const validToken = jwt.createToken('user');
const validImageURL = "https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg";

describe('Create Thumbnail Route', () => {
  it('should receive a token', (done) => {
    chai.request(app)
    .get('/create-thumbnail')
    .end((err, res) => {
      expect(res).to.have.status(401);
      done();
    });
  });
  it('the token should be valid', (done) => {
    chai.request(app)
    .get('/create-thumbnail')
    .set('x-access-token', 'random token')
    .end((err, res) => {
      expect(res).to.have.status(500);
      done();
    });
  });
  it('should return status 400 if dont receive a url', (done) => {
    chai.request(app)
    .get('/create-thumbnail')
    .set('x-access-token', validToken)
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should return status 500 if url is invalid', (done) => {
    chai.request(app)
    .get('/create-thumbnail')
    .set('x-access-token', validToken)
    .send({url: 'invalid url'})
    .end((err, res) => {
      expect(res).to.have.status(500);
      done();
    });
  });
  it('should return status 400 if url isn\'t a string', done => {
    chai.request(app)
    .get('/create-thumbnail')
    .set('x-access-token', validToken)
    .send({url: []})
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('Should send a Html if image is valid', (done) => {
    chai.request(app)
    .get('/create-thumbnail')
    .set('x-access-token', validToken)
    .send({url: validImageURL})
    .end((err, res) => {
      expect(res).to.be.html;
      done();
    });
  });
});

