/*global describe, it, before */

import chai from 'chai';
import fetch from 'node-fetch';
import Fetch from '../dist/rd-fetch.js';

chai.expect();

const expect = chai.expect;
const assert = chai.assert;
const jsonServer = require('json-server');
const app = jsonServer.create();
const port = 3000;
const endpoint = 'http://localhost:3000';
let server;

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
  server = app.listen(port);
  it('should have respons.ok === true', (done) => {
    Fetch.json(`${endpoint}/posts/1`)
      .then((response) => {
        expect(response.ok).to.be.true;
      }).catch(() => {

      });

    server.close(done);
  });
});
