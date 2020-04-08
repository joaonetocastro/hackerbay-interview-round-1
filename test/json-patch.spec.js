const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const {expect} = chai;
const jwt = require('../src/jwt');

chai.use(chaiHttp);

const validToken = jwt.createToken('user');
const patchExample = [
  {
    "op": "replace",
    "path": "/a",
    "value": 18
  },
  {
    "op": "add",
    "path": "/b",
    "value": [
      0,
      2,
      3
    ]}
  ];
describe('json patch', ()=> {
  it('should receive a token', (done) => {
    chai.request(app)
    .get('/json-patch')
    .end((err, res) => {
      expect(res).to.have.status(401);
      done();
    });
  });
  it('the token should be valid', (done) => {
    chai.request(app)
    .get('/json-patch')
    .set('x-access-token', 'random token')
    .end((err, res) => {
      expect(res).to.have.status(500);
      done();
    });
  });
  it('should receive jsonObject AND patch of type json', (done) => {
    chai.request(app)
    .get('/json-patch')
    .set('x-access-token', validToken)
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('jsonObject should be an object', (done) => {
    chai.request(app)
    .get('/json-patch')
    .set('x-access-token', validToken)
    .send({jsonObject: 1})
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('patch should be an array', (done) => {
    chai.request(app)
    .get('/json-patch')
    .set('x-access-token', validToken)
    .send({patch: {}})
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  
  it('should receive a jsonObject of type json', (done) => {
    chai.request(app)
    .get('/json-patch')
    .send({patch: patchExample})
    .set('x-access-token', validToken)
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should receive a patch of type json', (done) => {
    chai.request(app)
    .get('/json-patch')
    .send({jsonObject: {a: 10}})
    .set('x-access-token', validToken)
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('should generate a json result', (done) => {
    chai.request(app)
    .get('/json-patch')
    .send({jsonObject: {a:10}, patch: patchExample})
    .set('x-access-token', validToken)
    .end((err, res) => {
      expect(res.body).to.have.property('result');
      done();
    });
  });
});