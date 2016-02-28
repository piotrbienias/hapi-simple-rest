'use strict';

const request         = require('supertest');
const chai            = require('chai');

chai.should();
const expect          = chai.expect;

const url             = 'http://localhost:3000';

describe('Routing tests of the application', function(){

  it('should return string from /home path', function(done){

    request(url)
      .get('/home')
      .expect(200)
      .end(function(error, response) {
        if (error) {
          return done(error);
        }

        expect(response.body.message).to.equal('Exemplary string from RESTful web service');

        done();
      });
  });

  it('should return list of users', function(done){

    request(url)
      .get('/users')
      .expect(200)
      .end(function(error, response) {
        if (error) {
          return done(error);
        }

        expect(response.body.users.length).to.equal(3);
        expect(response.body.users[0]).to.be.an('object');
        expect(response.body.users[0]).to.have.all.keys(['id', 'username', 'email']);

        done();
      });
  });

  it('should return user with specified id', function(done){

    request(url)
      .get('/users/2')
      .expect(200)
      .end(function(error, response) {
        if (error) {
          return done(error);
        }

        expect(response.body.user).to.be.an('object');
        expect(response.body.user).to.have.all.keys(['id', 'username', 'email'])
        expect(response.body.user.id).to.equal(2);
        expect(response.body.user.username).to.equal('carrie');

        done();
      });
  });
});
