const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const faker = require('faker');
const Request = require('../models/request');

let amountOfRequests = 0;

describe('Test all methods', () => {
  before(() => {
    this.requestFields = {};
    this.requestFields['trap_id'] = faker.internet.domainWord();
    this.requestFields['Cookie'] = faker.random.uuid();
    this.requestFields['userAgent'] = faker.internet.userAgent();

    this.requestFields['name'] = faker.name.firstName();
    this.requestFields['mail'] = faker.internet.email();
    this.requestFields['image'] = faker.image.nature();
  });

  after((done) => {
    Request.deleteMany({'trap_id': this.requestFields['trap_id']}, () => done());
  });

  describe('GET method', () => {
    beforeEach(() => {
      amountOfRequests++;
    });

    it('without query', (done) => {
      chai.request(server)
        .get(`/${this.requestFields['trap_id']}`)
        .set('Cookie', this.requestFields['Cookie'])
        .set('user-agent', this.requestFields['userAgent'])
        .end((err, res) => {
          res.should.have.status(200);
          Object.keys(res.body).length.should.be.eql(0);

          done();
        });
    });
    it('with query', (done) => {
      chai.request(server)
        .get(`/${this.requestFields['trap_id']}?` + 
            `name=${this.requestFields['name']}&mail=${this.requestFields['mail']}`)
        .set('Cookie', this.requestFields['Cookie'])
        .set('user-agent', this.requestFields['userAgent'])
        .end((err, res) => {
          res.should.have.status(200);
          Object.keys(res.body).length.should.be.eql(0);

          done();
        });
    });
  });

  describe('POST method', () => {
    beforeEach(() => {
      amountOfRequests++;
    });

    it('with body', (done) => {
      let book = {
        name: 'serhii',
        work: 'developer',
        year: 1996
      };
      chai.request(server)
        .post(`/${this.requestFields['trap_id']}`)
        .set('Cookie', this.requestFields['Cookie'])
        .set('user-agent', this.requestFields['userAgent'])
        .set('content-type', 'application/json')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          Object.keys(res.body).length.should.be.eql(0);

          done();
        });
    });

    it('with query', (done) => {
      chai.request(server)
        .post(`/${this.requestFields['trap_id']}?` + 
        `name=${this.requestFields['name']}&mail=${this.requestFields['mail']}`)
        .set('Cookie', this.requestFields['Cookie'])
        .set('user-agent', this.requestFields['userAgent'])
        .end((err, res) => {
          res.should.have.status(200);
          Object.keys(res.body).length.should.be.eql(0);

          done();
        });
    });

    it('with body and query', (done) => {
      let book = {
        name: 'serhii',
        work: 'developer',
        year: 1996
      };

      chai.request(server)
        .post(`/${this.requestFields['trap_id']}?` + 
        `name=${this.requestFields['name']}&mail=${this.requestFields['mail']}`)
        .set('Cookie', this.requestFields['Cookie'])
        .set('user-agent', this.requestFields['userAgent'])
        .set('content-type', 'application/json')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          Object.keys(res.body).length.should.be.eql(0);
          
          done();
        });
    });

    it('with image', (done) => {
      chai.request(server)
        .post(`/${this.requestFields['trap_id']}`)
        .set('Cookie', this.requestFields['Cookie'])
        .set('user-agent', this.requestFields['userAgent'])
        .set('content-type','image/jpeg')
        .send(this.requestFields['image'])
        .end((err, res) => {
          res.should.have.status(200);
          Object.keys(res.body).length.should.be.eql(0);
          
          done();
        });
    });
  });

  describe('models/request', () => {
    it('Getting saved requests', (done) => {
      Request.Request.find({'trap_id': this.requestFields['trap_id']}, (err, data) => {
        data.length.should.be.eql(amountOfRequests);
        data.forEach(element => 
          (element['trap_id']).should.be.eql(this.requestFields['trap_id']));

        done();
      });
    });
  });
});