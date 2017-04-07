/*global describe, it, before, after */

import chai from 'chai';
import Fetch from '../dist/rd-fetch.js';

chai.expect();

global.fetch = require('node-fetch');

const expect = chai.expect;
const assert = chai.assert;
const path  = require('path');
const jsonServer = require('json-server');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const endpoint = `${protocol}://${host}:${port}`;

function setupServer(middlewares) {
  server.use(router);
  server.use(middlewares);
  server.listen(port);
}

describe('Fetch',  () => {
  it('should have the static json method', (done) => {
    expect(typeof Fetch.json === 'function').to.be.true;
    done();
  });
});

describe('Fetch.json()', () => {
  it('should throw an error that the URL argument is missing', (done) => {
    assert.throws(() => { Fetch.json(); }, Error, 'You must provide a url resource to fetch');
    done();
  });
});

describe('GET', () => {
  before(() => {
    setupServer(middlewares);
  });
  it('should have response.ok === true', (done) => {
    Fetch.json(`${endpoint}/posts/1`)
      .then((response) => {
        expect(response.ok).to.be.true;
        expect(response.json).to.not.be.null;
        done();
      }).catch((error) => {
        done(error);
      });
  });
});

describe('GET', () => {
  it('should have response.json and it should not be null', (done) => {
    Fetch.json(`${endpoint}/posts/1`)
      .then((response) => {
        expect(response.json).to.not.be.null;
        done();
      }).catch((error) => {
        done(error);
      });
  });
});

describe('GET', () => {
  it('should be chainable', (done) => {
    let chainable = function() {
      return Fetch.json(`${endpoint}/posts/1`)
      .then((response) => {
        expect(response.json).to.not.be.null;
        return Promise.resolve(response);
      })
      .catch((error) => {
        done(error);
      });
    };

    chainable()
      .then((response) => {
        expect(response.json).to.not.be.null;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
