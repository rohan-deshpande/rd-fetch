/*global describe, it, before */

import chai from 'chai';
import Fetch from '../dist/rd-fetch.js';

chai.expect();

global.fetch = require('node-fetch'); // eslint-disable-line no-undef
const expect = chai.expect;
const assert = chai.assert;
const path  = require('path'); // eslint-disable-line no-undef
const jsonServer = require('json-server'); // eslint-disable-line no-undef
const router = jsonServer.router(path.join(__dirname, 'db.json')); // eslint-disable-line no-undef
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const endpoint = `${protocol}://${host}:${port}`;

function startServer(middlewares) {
  server.listen(port, () => {
    // set middlewares
    server.use(middlewares);

    // setup the body-parser for POST, PUT & PATCH requests
    server.use(jsonServer.bodyParser);

    // set test routes
    server.get('/wrong-response-headers', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end();
    });

    server.get('/500', (req, res) => {
      res.writeHead(500, 'Internal Server Error', { 'Content-Type': 'application/json' });
      res.end();
    });

    server.get('/404', (req, res) => {
      res.writeHead(404, 'Not Found', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        'error': '404 Not Found'
      }));
    });

    server.get('/401', (req, res) => {
      res.writeHead(401, 'Unauthorized', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        'error': '401 Unauthorized'
      }));
    });

    server.post('/post', (req, res) => {
      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(req.body));
    });

    // use router
    server.use(router);
  });
}

describe('Ensure json method',  () => {
  it('should have the static json method', (done) => {
    expect(typeof Fetch.json === 'function').to.be.true;
    done();
  });
});

describe('Ensure error thrown if json method is called without URL arg', () => {
  it('should throw an error that the URL argument is missing', (done) => {
    assert.throws(() => { Fetch.json(); }, Error, 'You must provide a url resource to fetch');
    done();
  });
});

describe('Get An OK Response', () => {
  before(() => {
    startServer(middlewares);
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

describe('Get Response JSON', () => {
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

describe('Chain all the things', () => {
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

describe('Catch Incorrect Response Headers', () => {
  it('should throw a type error about response content-type', (done) => {
    Fetch.json(`${endpoint}/wrong-response-headers`)
      .catch((error) => {
        assert.equal(error, 'TypeError: Content-Type of response is not application/json');
        done();
      });
  });
});

describe('Handle 500 Internal Server Error', () => {
  it('should catch a 500 error', (done) => {
    Fetch.json(`${endpoint}/500`)
      .catch((error) => {
        assert.equal(error.status, 500);
        expect(error.json).to.be.null;
        done();
      });
  });
});

describe('Handle 404 Not Found', () => {
  it('should catch a 404 error with a json response', (done) => {
    Fetch.json(`${endpoint}/404`)
      .catch((error) => {
        assert.equal(error.status, 404);
        expect(error.json).to.not.be.null;
        done();
      });
  });
});

describe('Handle 401 Unauthorized', () => {
  it('should catch a 401 error with a json response', (done) => {
    Fetch.json(`${endpoint}/401`)
      .catch((error) => {
        assert.equal(error.status, 401);
        expect(error.json).to.not.be.null;
        done();
      });
  });
});

describe('Handle Sending JSON', () => {
  const body = { 'hello': 'world' };

  it('should return what was sent to confirm it was posted correctly', (done) => {
    Fetch.json(`${endpoint}/post`, {
      method: 'POST',
      body: body
    })
      .then((response) => {
        assert.equal(JSON.stringify(body), JSON.stringify(response.json));
        done();
      });
  });
});
